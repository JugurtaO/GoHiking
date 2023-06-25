import { Request,Response } from "express";

export  const getLogin=(req: Request,res: Response)=>{
    // return res.send("Login page is comming soon in views!");
    return res.render("login");

}