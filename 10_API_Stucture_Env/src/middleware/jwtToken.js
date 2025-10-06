const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const verifyToken = async (req, res, next) => {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return res.status(401).json({ message: "Authorization Missing" });
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(400).json({ message: "Token Missing" });
        }

        const {userId} = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ status: 401, message: "Invalid User Token" });
        }
        req.user = user;
        next();

    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({ status: 403, message: "Invalid or Expired Token" });
    }
};

module.exports = verifyToken;
