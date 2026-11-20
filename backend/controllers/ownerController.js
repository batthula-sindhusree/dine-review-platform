const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");

// Owner Dashboard
const getOwnerDashboard = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({
            owner: req.user.id
        });

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "No restaurant assigned to this owner."
            });
        }

        const reviews = await Review.find({
            restaurant: restaurant._id
        }).populate("customer", "name email");

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
                    totalReviews: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            restaurant,
            dashboard: {
                averageRating: stats[0]?.averageRating || 0,
                totalReviews: stats[0]?.totalReviews || 0
            },
            reviews
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { getOwnerDashboard };