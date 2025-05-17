const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    const token = req.cookies.token || req.body.token;
    if (!token) return res.status(401).json({ message: "Access denied. No token provided. Kindly login again." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message: "Invalid token. Please login again." });
    }
};
exports.isClient = (req, res, next) => {
    if (!req.user || req.user.role !== "Client") {
        // console.log("*****Access denied******");
        return res.status(403).json({ error: "Access denied. Only Clients are allowed." });
    }
    // console.log("*****Access granted******");

    next();
};
exports.isFreelancer = (req, res, next) => {
    if (!req.user || req.user.role !== "Freelancer") {
        return res.status(403).json({ error: "Access denied. Only Freelancers are allowed." });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "Admin") {
        return res.status(403).json({ error: "Access denied. Only Admins are allowed." });
    }
    next();
};