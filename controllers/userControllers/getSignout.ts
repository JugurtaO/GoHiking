
import { Request,Response } from "express";

export  const getSignout=(req: Request,res: Response)=>{
    return res.render("signout");

}