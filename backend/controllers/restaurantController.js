
const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Review = require("../models/Review");
const mongoose = require("mongoose");

// CREATE RESTAURANT
const createRestaurant = async (req, res) => {
    try {
        const { name, location, cuisine } = req.body;

        if (
    typeof name !== "string" || !name.trim() ||
    typeof location !== "string" || !location.trim() ||
    typeof cuisine !== "string" || !cuisine.trim()
) {
    return res.status(400).json({
        success: false,
        message: "Valid name, location and cuisine are required."
    });
}

        const restaurant = await Restaurant.create({
            name: name.trim(),
            location: location.trim(),
            cuisine: cuisine.trim()
        });

        return res.status(201).json({
            success: true,
            message: "Restaurant created successfully.",
            restaurant
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL RESTAURANTS WITH SEARCH AND FILTER
const getRestaurants = async (req, res) => {
    try {
        const { search, location, cuisine } = req.query;
        const filter = {};

        if (search && search.trim()) {
            const searchRegex = new RegExp(
                search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                "i"
            );

            filter.$or = [
                { name: searchRegex },
                { location: searchRegex },
                { cuisine: searchRegex }
            ];
        }

        if (location && location.trim()) {
    const locationRegex = new RegExp(
        location.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
    );
    filter.location = locationRegex;
}

if (cuisine && cuisine.trim()) {
    const cuisineRegex = new RegExp(
        cuisine.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
    );
    filter.cuisine = cuisineRegex;
}

        const restaurants = await Restaurant.find(filter)
            .populate("owner", "name email")
            .sort({ createdAt: -1 });

        const result = await Promise.all(
            restaurants.map(async (restaurant) => {
                const stats = await Review.aggregate([
                    {
                        $match: {
                            restaurant: restaurant._id
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            averageRating: { $avg: "$rating" },
                            reviewCount: { $sum: 1 }
                        }
                    }
                ]);

                return {
                    ...restaurant.toObject(),
                    averageRating: stats[0]?.averageRating || 0,
                    reviewCount: stats[0]?.reviewCount || 0
                };
            })
        );

        return res.status(200).json({
            success: true,
            count: result.length,
            restaurants: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET SINGLE RESTAURANT
const getRestaurantById = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID."
            });
        }

        const restaurant = await Restaurant.findById(req.params.id)
            .populate("owner", "name email");

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        const stats = await Review.aggregate([
            { $match: { restaurant: restaurant._id } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                    reviewCount: { $sum: 1 }
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            restaurant,
            averageRating: stats[0]?.averageRating || 0,
            reviewCount: stats[0]?.reviewCount || 0
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET RESTAURANT RATING DISTRIBUTION
const getRatingDistribution = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID."
            });
        }

        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        const distribution = await Review.aggregate([
            {
                $match: {
                    restaurant: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $group: {
                    _id: "$rating",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: -1 }
            }
        ]);

        const ratingDistribution = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0
        };

        distribution.forEach((item) => {
            ratingDistribution[item._id] = item.count;
        });

        return res.status(200).json({
            success: true,
            restaurant: restaurant.name,
            ratingDistribution
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ASSIGN OWNER TO RESTAURANT
const assignOwner = async (req, res) => {
    try {
        const { ownerId } = req.body;
        const { id } = req.params;

        if (!ownerId) {
            return res.status(400).json({
                success: false,
                message: "Owner ID is required."
            });
        }

        if (
            !mongoose.isValidObjectId(ownerId) ||
            !mongoose.isValidObjectId(id)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID."
            });
        }

        const owner = await User.findById(ownerId);

        if (!owner || owner.role !== "owner") {
            return res.status(404).json({
                success: false,
                message: "Restaurant owner not found."
            });
        }

        const restaurant = await Restaurant.findByIdAndUpdate(
            id,
            { owner: ownerId },
            { new: true, runValidators: true }
        );

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Owner assigned successfully.",
            restaurant
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// OWNER UPDATE RESTAURANT
const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID."
            });
        }

        const { name, location, cuisine } = req.body;
        const updates = {};

        if (name?.trim()) updates.name = name.trim();
        if (location?.trim()) updates.location = location.trim();
        if (cuisine?.trim()) updates.cuisine = cuisine.trim();

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one field to update."
            });
        }

        const restaurant = await Restaurant.findOneAndUpdate(
            {
                _id: id,
                owner: req.user.id
            },
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Assigned restaurant not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Restaurant updated successfully.",
            restaurant
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ADMIN UPDATE RESTAURANT
const adminUpdateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID."
            });
        }

        const { name, location, cuisine } = req.body;
        const updates = {};

        if (name?.trim()) updates.name = name.trim();
        if (location?.trim()) updates.location = location.trim();
        if (cuisine?.trim()) updates.cuisine = cuisine.trim();

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one field to update."
            });
        }

        const restaurant = await Restaurant.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Restaurant updated successfully by admin.",
            restaurant
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ADMIN DELETE RESTAURANT
const adminDeleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID."
            });
        }

        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        await Review.deleteMany({
            restaurant: restaurant._id
        });

        await Restaurant.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Restaurant and its reviews deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    getRatingDistribution,
    assignOwner,
    updateRestaurant,
    adminUpdateRestaurant,
    adminDeleteRestaurant
};
