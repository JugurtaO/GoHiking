"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogin = void 0;
const getLogin = (req, res) => {
    // return res.send("Login page is comming soon in views!");
    return res.render("login");
};
exports.getLogin = getLogin;
