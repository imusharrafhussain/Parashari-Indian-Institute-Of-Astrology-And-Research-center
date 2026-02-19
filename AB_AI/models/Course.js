
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, unique: true }, // Added for easier lookup
    price: Number, // Storing price for reference/display
    isSubscriptionBased: Boolean,
    videoKey: String // Cloudflare video UID
});

module.exports = mongoose.model("Course", courseSchema);
