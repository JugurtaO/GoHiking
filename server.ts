import express from "express";

const app=express();



const port: number=3000;
app.listen(port,()=>{
    console.log("app runs on [port:",port,"]");
});