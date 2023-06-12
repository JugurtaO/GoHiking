import { Request,Response } from "express";
import * as myModels from "../../models/index";


export  const postSignup=async (req: Request,res: Response)=>{

    //get user credentials from request's body
    const {user_nickname,user_email,user_password}:{user_nickname:string,user_email:String,user_password:string } = req.body;


    if(!user_nickname.length ||!user_email.length ||!user_password.length)
        return res.send("credentials can not be blank!")

    const newUser = await myModels.User.create({user_nickname:user_nickname,user_email:user_email,user_password:user_password});

    
    
    
    return res.send("OK.");

}