const Review = require("../models/Review");

exports.addReview = async (req, res) => {
    try {
        const { freelancerId, rating, comment } = req.body;
        const review = new Review({ freelancerId, rating, comment, clientId: req.user.userId });
        await review.save();
        res.status(201).json({ message: "Review added successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const { freelancerId } = req.params;
        const reviews = await Review.find({ freelancerId }).populate("clientId", "name");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
