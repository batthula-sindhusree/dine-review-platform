const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

const {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    assignOwner,
    updateRestaurant,
    adminUpdateRestaurant,
    adminDeleteRestaurant,
    getRatingDistribution
} = require("../controllers/restaurantController");

router.get("/", getRestaurants);
router.get("/:id/ratings", getRatingDistribution);
router.get("/:id", getRestaurantById);

router.post("/", protect, authorize("admin"), createRestaurant);
router.put("/:id/assign-owner", protect, authorize("admin"), assignOwner);
router.put("/:id/admin", protect, authorize("admin"), adminUpdateRestaurant);
router.delete("/:id", protect, authorize("admin"), adminDeleteRestaurant);

router.put("/:id", protect, authorize("owner"), updateRestaurant);

module.exports = router;