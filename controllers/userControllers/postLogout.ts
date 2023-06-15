import { Request,Response } from "express";


export const postLogout= (req:Request,res:Response)=>{

    if(!req.session.active_user_email){
        return res.send("already logged out !");
    }


    //set user session flags to null  <--> session killed
    req.session.active_user_email = null;
    req.session.active_user_id = null;

    res.send("Successfuly logged out.")
};