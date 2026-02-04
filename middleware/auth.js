module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    
    if (apiKey === process.env.API_KEY) {
        next(); // Authorized!
    } else {
        res.status(403).json({ message: 'Forbidden: Invalid API Key' });
    }
};