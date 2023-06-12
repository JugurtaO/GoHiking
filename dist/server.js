"use strict";
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
// SETUP OUR EXPRESS APP SETTINGS 
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//get connection to our DB
config_1.db_handler.authenticate().then(() => {
    console.log("Successfully connected  to MySQL server");
}).catch((error) => {
    console.error('Ouups, cannot get connection to MySQL server!' + error.message);
});
//use routes 
const index_1 = __importDefault(require("./routes/index"));
app.use(index_1.default);
//make our app listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("app runs on [port:", PORT, "]");
});
