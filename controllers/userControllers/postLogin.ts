import { NextFunction, Request, Response } from "express";
import * as myModels from "../../models/index";
import bcrypt from "bcryptjs";

import expressError from "../../utils/expressError";



export const postLogin =  async (req: Request, res: Response,next:NextFunction) => {

    if (req.session.active_user_email){
        req.flash("danger","Already logged in .");
        return res.redirect("/home");

    }

    const { user_email, user_password }: { user_email: String, user_password: string } = req.body;
    if (!user_email.length || !user_password.length)
    {
        req.flash("danger","credentials can not be blank!");
        return res.redirect("/users/login");
    }
       

    const userInDB = await myModels.User.findAll({ where: { user_email: user_email }, attributes: ['user_password','user_id','user_nickname'] });

    if (!userInDB || userInDB.length != 1)
    {
        req.flash("danger","Email or Password incorrect, try again!");
        return res.redirect("/users/login");
       
    }
      


    // check if the typed password is equal to the hashed database password.
    const is_password_correct: boolean = bcrypt.compareSync(user_password, userInDB[0].dataValues.user_password);

    if (!is_password_correct)  {
        req.flash("danger","Email or Password incorrect, try again!");
        return res.redirect("/users/login");
    }
      

    // create session for the current user & send back a cookie 
    req.session.active_user_email = user_email;
    req.session.active_user_id = userInDB[0].dataValues.user_id;
    req.session.active_user_nickname = userInDB[0].dataValues.user_nickname;
    
    req.flash("success","Successfuly logged in.");
    return res.redirect("/trails");
    
      

}