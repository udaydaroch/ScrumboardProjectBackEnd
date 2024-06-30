const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        // Pre-flight request. Reply successfully:
        res.status(200).end();
    } else {
        next();
    }
};

module.exports = corsMiddleware;