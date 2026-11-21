
const Review = require("../models/Review");
const Restaurant = require("../models/Restaurant");

// ADD OR UPDATE REVIEW
const addReview = async (req, res) => {
    try {
        const { restaurant, rating, comment } = req.body;

        if (!restaurant || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: "Restaurant, rating and comment are required."
            });
        }

        if (!Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5."
            });
        }

        if (!/^[0-9a-fA-F]{24}$/.test(restaurant)) {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID."
            });
        }

        const restaurantExists = await Restaurant.findById(restaurant);

        if (!restaurantExists) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found."
            });
        }

        const review = await Review.findOneAndUpdate(
            {
                customer: req.user.id,
                restaurant
            },
            {
                rating: Number(rating),
                comment
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true
            }
        );

        res.status(201).json({
            success: true,
            message: "Review submitted successfully.",
            review
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET RESTAURANT REVIEWS
const getReviews = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        if (!/^[0-9a-fA-F]{24}$/.test(restaurantId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID."
            });
        }

        const reviews = await Review.find({
            restaurant: restaurantId
        })
            .populate("customer", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET LOGGED-IN CUSTOMER'S REVIEWS
const getMyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            customer: req.user.id
        })
            .populate("restaurant", "name location cuisine")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE OWN REVIEW
const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const { id } = req.params;

        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid review ID."
            });
        }

        if (
            rating === undefined ||
            !Number.isInteger(Number(rating)) ||
            Number(rating) < 1 ||
            Number(rating) > 5
        ) {
            return res.status(400).json({
                success: false,
                message: "Rating must be a whole number between 1 and 5."
            });
        }

        if (!comment || !comment.trim()) {
            return res.status(400).json({
                success: false,
                message: "Review comment is required."
            });
        }

        const review = await Review.findOneAndUpdate(
            {
                _id: id,
                customer: req.user.id
            },
            {
                rating: Number(rating),
                comment: comment.trim()
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found or you cannot update it."
            });
        }

        res.status(200).json({
            success: true,
            message: "Review updated successfully.",
            review
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE OWN REVIEW
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid review ID."
            });
        }

        const review = await Review.findOneAndDelete({
            _id: id,
            customer: req.user.id
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found or you cannot delete it."
            });
        }

        res.status(200).json({
            success: true,
            message: "Review deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addReview,
    getReviews,
    getMyReviews,
    updateReview,
    deleteReview
};
