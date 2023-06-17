"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./userRoutes/index"));
const otherRoutes_1 = __importDefault(require("./otherRoutes"));
const Router = express_1.default.Router();
Router.use("/", otherRoutes_1.default);
Router.use("/users", index_1.default);
exports.default = Router;
