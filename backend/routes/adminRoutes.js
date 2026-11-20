const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

const {
    getDashboardStats,
    getAllUsers,
    deleteUser,
    getAllReviews,
    deleteReview,
    createOwner
} = require("../controllers/adminController");

router.use(protect, authorize("admin"));

router.get("/dashboard", getDashboardStats);
router.get("/users", getAllUsers);
router.post("/owners", createOwner);
router.delete("/users/:id", deleteUser);
router.get("/reviews", getAllReviews);
router.delete("/reviews/:id", deleteReview);

module.exports = router;