require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

async function promoteAdmin() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

        if (!adminEmail) {
            console.log("Please configure ADMIN_EMAIL in your .env file.");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI);

        const user = await User.findOneAndUpdate(
            { email: adminEmail },
            { role: "admin" },
            { new: true }
        );

        if (!user) {
            console.log("Admin user not found.");
        } else {
            console.log("Admin role assigned successfully!");
            console.log("Role:", user.role);
        }
    } catch (error) {
        console.log(error.message);
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
    }
}

promoteAdmin();