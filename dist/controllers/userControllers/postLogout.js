"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogout = void 0;
const postLogout = (req, res, next) => {
    if (!req.session.active_user_email) {
        req.flash("danger", "Already logged out !");
        return res.redirect("/users/login");
    }
    //set user session flags to null  <--> session killed
    req.session.active_user_email = null;
    req.session.active_user_id = null;
    req.session.active_user_nickname = null;
    req.flash("success", "Successfuly logged out, see you soon ! ");
    return res.redirect("/users/login");
};
exports.postLogout = postLogout;
