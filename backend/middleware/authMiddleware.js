const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Not authorized, authorization denied' });

    try {
        // Verify token with the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;  // Attach user data to the request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
