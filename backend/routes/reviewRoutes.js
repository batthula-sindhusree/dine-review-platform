const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

const {
    addReview,
    getReviews,
    updateReview,
    deleteReview
} = require("../controllers/reviewController");

router.get("/:restaurantId", getReviews);
router.post("/", protect, authorize("customer"), addReview);
router.put("/:id", protect, authorize("customer"), updateReview);
router.delete("/:id", protect, authorize("customer"), deleteReview);

module.exports = router;