//requiring some stuff for our app
import express from "express";
import dotenv from "dotenv";



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



//use routes 
import Router from "./routes/index";
app.use(Router);

 
//make our app listen on port 3000
const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("app runs on [port:", PORT, "]");
});  