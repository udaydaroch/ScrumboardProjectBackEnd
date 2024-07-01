const corsMiddleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://scrumboard-project.vercel.app');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
};

module.exports = corsMiddleware;