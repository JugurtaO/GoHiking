"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = void 0;
//notice that i can implement middleware for each type of request according  to the route  structure 
//this one it's an example when the user id is passed in params 
//later i will not do that , i will verify it from session
const checkAuthorization = (req, res, next) => {
    var _a, _b;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.active_user_email)) {
        // req.flash("danger", "Please log in to proceed.");
        return res.redirect("/users/login");
    }
    if (req.session.active_user_id == ((_b = req.params) === null || _b === void 0 ? void 0 : _b.user_id)) {
        return next();
    }
    else {
        return res.status(401).send("Not authorized.");
    }
};
exports.checkAuthorization = checkAuthorization;
