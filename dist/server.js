"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const connect_flash_1 = __importDefault(require("connect-flash"));
//creating express app 
const app = (0, express_1.default)();
// Set up middlewars 
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../views'));
app.use(express_1.default.static('public'));
//importing sessions & Declaring merging on express-session
const express_session_1 = __importDefault(require("express-session"));
//requiring mosgoStore for storing our sessions in mongo Atlas DB
const connect_mongo_1 = __importDefault(require("connect-mongo"));
//dontenv configured and requiring db_handler 
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
/** SETUP OUR SESSIONS */
// console.log("mongo URL:",String(process.env.MONGO_ATLAS_SESSION_STORE_URL));
const sessionOption = {
    name: String(process.env.SESSION_NAME),
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: String(process.env.MONGO_ATLAS_SESSION_STORE_URL),
        touchAfter: 5 * 24 * 60 * 60
    }),
    cookie: {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};
app.use((0, express_session_1.default)(sessionOption));
app.use((0, connect_flash_1.default)());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.danger = req.flash("danger");
    res.locals.active_user_email = req.session.active_user_email;
    res.locals.active_user_id = req.session.active_user_id;
    res.locals.active_user_nickname = req.session.active_user_nickname;
    // console.log("success >>",res.locals.success);
    // console.log("danger >>",res.locals.danger);
    next();
});
//use routes 
const index_1 = __importDefault(require("./routes/index"));
app.use(index_1.default);
//make our app listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("app runs on [port:", PORT, "]");
});
