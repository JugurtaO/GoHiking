"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.checkLogin = (req, res, next) => {
    if (!req.session.active_user_email) {
        // return res.send("Please login to proceed.");
        return res.redirect("/users/login");
    }
    return next();
};
