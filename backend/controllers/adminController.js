
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Admin Dashboard
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalRestaurants = await Restaurant.countDocuments();
        const totalReviews = await Review.countDocuments();

        const stats = await Review.aggregate([
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            dashboard: {
                totalUsers,
                totalRestaurants,
                totalReviews,
                averagePlatformRating: stats[0]?.averageRating || 0
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID."
            });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        await Review.deleteMany({ customer: user._id });

        // Unassign restaurants belonging to a deleted owner
        await Restaurant.updateMany(
            { owner: user._id },
            { $set: { owner: null } }
        );

        res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("customer", "name email")
            .populate("restaurant", "name location");

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

// Delete Review
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid review ID."
            });
        }

        const review = await Review.findByIdAndDelete(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Review removed successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create Restaurant Owner Account
const createOwner = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        // Required field validation
        if (!name?.trim() || !email?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required."
            });
        }

        name = name.trim();
        email = email.trim().toLowerCase();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address."
            });
        }

        // Password validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be 8-16 characters and include uppercase, lowercase, number and special character."
            });
        }

        // Check duplicate email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const owner = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "owner"
        });

        res.status(201).json({
            success: true,
            message: "Restaurant owner created successfully.",
            owner: {
                id: owner._id,
                name: owner.name,
                email: owner.email,
                role: owner.role
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllReviews,
    deleteReview,
    createOwner
};
