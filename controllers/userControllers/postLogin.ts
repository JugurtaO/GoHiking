import { Request,Response } from "express";
import * as myModels from "../../models/index";
import bcrypt from "bcryptjs";




export  const postLogin=async (req: Request,res: Response)=>{

    const {user_email,user_password}:{user_email:String,user_password:string } = req.body;
    if(!user_email.length ||!user_password.length)
        return res.send("credentials can not be blank!")

    const userInDB =await myModels.User.findAll({where:{user_email:user_email},attributes:['user_password']});

    if(!userInDB || userInDB.length!=1)
        return res.send("Email or Password incorrect, try again!")

    
// check if the typed password is equal to the hashed database password.
  const is_password_correct:boolean = bcrypt.compareSync(user_password, userInDB[0].dataValues.user_password);

  if(!is_password_correct){
      return res.send("Email or Password incorrect, try again !");
     
  }


     // create session for the current user & send back a cookie 
     req.session.active_user_email=user_email;
     req.session.active_user_id=userInDB[0].dataValues.user_id;
     req.session.active_user_nickname=userInDB[0].dataValues.user_nickname;
    return res.send("OK.");

}