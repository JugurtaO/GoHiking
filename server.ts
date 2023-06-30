//requiring some stuff for our app
import { Request, Response } from "express";

import express from "express";
import dotenv from "dotenv";
import path from "path";
import flash from "connect-flash";

//creating express app 
const app = express();



// Set up middlewars 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'../views'));
app.use(express.static('public'));

//importing sessions & Declaring merging on express-session
import sessions from 'express-session';
declare module 'express-session' {
    export interface SessionData {
        active_user_nickname: { [key: string]: any };
        active_user_email: { [key:string]: any };
        active_user_id: { [key: number]: any };
    }
}

//requiring mosgoStore for storing our sessions in mongo Atlas DB
import mongostore from "connect-mongo";



//dontenv configured and requiring db_handler 
dotenv.config();
import { db_handler } from "./database/config";


// SETUP OUR EXPRESS APP SETTINGS 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//get connection to our DB
db_handler.authenticate().then(() => {
    console.log("Successfully connected  to MySQL server");
}).catch((error: Error) => {
    console.error('Ouups, cannot get connection to MySQL server!' + error.message);
});


/** SETUP OUR SESSIONS */
// console.log("mongo URL:",String(process.env.MONGO_ATLAS_SESSION_STORE_URL));
const sessionOption = {
    name: String(process.env.SESSION_NAME),
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    store: mongostore.create({
        mongoUrl: String(process.env.MONGO_ATLAS_SESSION_STORE_URL),
        touchAfter: 5 * 24 * 60 * 60
    }),
    cookie: {
        maxAge: 5 * 24 * 60 * 60 * 1000, //  max_age = 5 days
        httpOnly: true,
    }
};

app.use(sessions(sessionOption));
app.use(flash());




app.use((req:Request, res:Response, next:Function) => {
    res.locals.success = req.flash("success");
    res.locals.danger = req.flash("danger");
    res.locals.active_user_email = req.session.active_user_email;
    res.locals.active_user_id = req.session.active_user_id;
    res.locals.active_user_nickname=req.session.active_user_nickname;
    
    // console.log("success >>",res.locals.success);
    // console.log("danger >>",res.locals.danger);
    
    next()
})


//use routes 
import Router from "./routes/index";
app.use(Router);

//make our app listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("app runs on [port:", PORT, "]");
});  