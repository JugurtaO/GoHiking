import { Request,Response } from "express";

export const checkLogin = (req:Request,res:Response,next:Function) => {
    if(!req.session.active_user_email){
        req.flash("danger", "Please login to proceed.");
        return res.redirect("/users/login");
    }
    return next();
}