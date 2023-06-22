"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = void 0;
//This module aims to protect our database from SQL injections from http requests by sanitizing request data before raising the controller
const sanitize = (req, res, next) => {
    Object.keys(req.body).forEach(key => {
        if (isNaN(req.body[String(key)])) // if it is a string
         {
            req.body[String(key)] = req.body[String(key)].replace(/['`";\$%\*]/g, "_");
        }
    });
    Object.keys(req.params).forEach(key => {
        if (typeof (req.params[key]) == typeof ("stringimi forte")) // if it is a string 
         {
            req.params[String(key)] = req.params[String(key)].replace(/['`";\$%\*]/g, "_");
        }
    });
    next();
};
exports.sanitize = sanitize;
