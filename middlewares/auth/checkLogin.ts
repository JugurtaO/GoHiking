import { Request,Response } from "express";

module.exports.checkLogin = (req:Request,res:Response,next:Function) => {
    if(!req.session.active_user_email){
        // return res.send("Please login to proceed.");
        return res.redirect("/users/login");
    }
    return next();
}