"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const func = (func) => {
    console.log("je suis dans le middlware catchAsync!!!!");
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
exports.default = func;
