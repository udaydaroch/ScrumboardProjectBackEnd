import express from "express"
import bodyParser from "body-parser"
import allowCrossOriginRequestsMiddleware from "../app/middleware/cors.middleware"
import Logger from "./logger"

export default () => {
    const app = express();

    // Middleware
    app.use(allowCrossOriginRequestsMiddleware);
    app.use(bodyParser.json());
    app.use(bodyParser.raw({type: 'text/plain'}));
    app.use(bodyParser.raw({type: ['image/*'], limit: '5mb'}));

    app.use('*', (req, res) => {
        res.status(404).send('Page not found');
    });

    // ROUTES
    require('../app/routes/base.routes')(app)
    require('../app/routes/user.routes')(app);
    return app;
}