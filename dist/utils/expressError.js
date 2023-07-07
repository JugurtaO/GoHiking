"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class expressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.default = expressError;
