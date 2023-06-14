import { Request,Response } from "express";
import * as myModels from "../../models/index";
import  bcrypt from "bcryptjs";

export  const postSignup=async (req: Request,res: Response)=>{

    //get user credentials from request's body
    const {user_nickname,user_email,user_password}:{user_nickname:string,user_email:String,user_password:string } = req.body;

    if(!user_nickname.length ||!user_email.length ||!user_password.length)
        return res.send("credentials can not be blank!")

    
    //generate a salt & hash the password
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(String(user_password), salt);
    


    const newUser = await myModels.User.create({user_nickname:user_nickname,user_email:user_email,user_password:hash});



    //checking wether the user has been successfully created
    const searchedUser= await myModels.User.findAll({where:{user_email:user_email}});

    if (!searchedUser || searchedUser.length != 1) 
        return res.send("Something went wrong. Please log in to proceed !.");

    

     // create session for the current user & send back a cookie 
    req.session.active_user_email=user_email;
    console.log( req.session.active_user_email);
    
    
    return res.send("OK.");

}