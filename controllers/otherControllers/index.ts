import { Request,Response } from "express";

export const home=(req:Request,res:Response)=>{
    res.send("Home page is comming soon in views!");

};

export const aboutUs=(req:Request,res:Response)=>{
    res.send("AboutUs page is comming soon in views!");
};
