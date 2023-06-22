import { Request,Response } from "express";

export const home=(req:Request,res:Response)=>{
    res.render("home");


};

export const about=(req:Request,res:Response)=>{
    res.render("about");
};
