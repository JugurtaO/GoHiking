"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = void 0;
const checkLogin = (req, res, next) => {
    if (!req.session.active_user_email) {
        req.flash("danger", "Please login to proceed.");
        return res.redirect("/users/login");
    }
    return next();
};
exports.checkLogin = checkLogin;
