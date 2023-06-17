"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutUs = exports.home = void 0;
const home = (req, res) => {
    res.send("Home page is comming soon in views!");
};
exports.home = home;
const aboutUs = (req, res) => {
    res.send("AboutUs page is comming soon in views!");
};
exports.aboutUs = aboutUs;
