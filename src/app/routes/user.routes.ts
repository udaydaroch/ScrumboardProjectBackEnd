import {Express} from "express";
import {rootUrl} from "./base.routes";
import * as user from '../controllers/user.controller';

module.exports = (app: Express) => {
    app.route(rootUrl+'/users/register')
        .post(user.register);

    app.route(rootUrl+'/users/login')
        .post(user.login);

    app.route(rootUrl+'/users/logout')
        .post(user.logout);

    app.route(rootUrl+'/users/:id')
        .get(user.view)
        .patch(user.update);
}