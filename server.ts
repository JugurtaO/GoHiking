//requiring some stuff for our app
import express from "express";
import dotenv from "dotenv";


//creating express app
const app = express();

//dontenv configured and requiring db_handler just after
dotenv.config();
import {db_handler} from "./database/config";




//get connection to our DB
db_handler.authenticate().then(() => {
    console.log("Successfully connected  to MySQL server");
}).catch((error: Error) => {
    console.error('Ouups, cannot get connection to MySQL server!'+ error.message);
}); 

 
//make our app listen on port 3000
const port: number = 3000;
app.listen(port, () => {
    console.log("app runs on [port:", port, "]");
});  