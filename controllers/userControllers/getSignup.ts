import { Request,Response } from "express";

export  const getSignup=(req: Request,res: Response)=>{
    return res.render("signup");

}