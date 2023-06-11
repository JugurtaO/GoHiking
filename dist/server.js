"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//requiring some stuff for our app
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//creating express app
const app = (0, express_1.default)();
//dontenv configured and requiring db_handler just after
dotenv_1.default.config();
const config_1 = require("./database/config");
//get connection to our DB
config_1.db_handler.authenticate().then(() => {
    console.log("Successfully connected  to MySQL server");
}).catch((error) => {
    console.error('Ouups, cannot get connection to MySQL server!' + error.message);
});
const controllers = __importStar(require("./controllers/index"));
app.get("/", controllers.renderHomePage);
//make our app listen on port 3000
const port = 3000;
app.listen(port, () => {
    console.log("app runs on [port:", port, "]");
});
