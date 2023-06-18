"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.about = exports.home = void 0;
const home = (req, res) => {
    res.render("home");
};
exports.home = home;
const about = (req, res) => {
    res.render("about");
};
exports.about = about;
