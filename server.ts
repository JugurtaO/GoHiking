//requiring some stuff for our app
import express from "express";
import dotenv from "dotenv";
//importing sessions
import sessions from "express-session";

//requiring mosgoStore for storing our sessions in mongo Atlas DB
import  mongostore from "connect-mongo";

//creating express app 
const app= express();


//dontenv configured and requiring db_handler 
dotenv.config();
import {db_handler} from "./database/config";


// SETUP OUR EXPRESS APP SETTINGS 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




//get connection to our DB
db_handler.authenticate().then(() => {
    console.log("Successfully connected  to MySQL server");
}).catch((error: Error) => {
    console.error('Ouups, cannot get connection to MySQL server!'+ error.message);
});  


/** SETUP OUR SESSIONS */
// console.log("mongo URL:",String(process.env.MONGO_ATLAS_SESSION_STORE_URL));
const sessionOption = {
    name: String(process.env.SESSION_NAME),
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    store:  mongostore.create({
        mongoUrl:String(process.env.MONGO_ATLAS_SESSION_STORE_URL),
        touchAfter:5 * 24 * 60 * 60
    }),
    cookie: {
        maxAge: 5 * 24 * 60 * 60 * 1000, //  max_age = 5 days
        httpOnly:true,
    }
};

app.use(sessions(sessionOption));




//use routes 
import Router from "./routes/index";
app.use(Router);

 
//make our app listen on port 3000
const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("app runs on [port:", PORT, "]");
});  