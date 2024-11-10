const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract token 
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Not authorized, authorization denied' });

    try {
        // Verify token with the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;  
        next();  // go to middleware 
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
