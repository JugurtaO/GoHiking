import { Request,Response } from "express";
import * as myModels from "../../models/index";
import bcrypt from "bcryptjs";

export const postSignout= async (req:Request,res:Response)=>{

    const { user_email, user_password } = req.body;
    const user_id = req.session.active_user_id;

    if(!user_email.length ||!user_password.length)
        return res.send("credentials can not be blank!")
    
    const all_Users_With_Given_Email= await myModels.User.findAll({where:{user_email:user_email}});

    if (!all_Users_With_Given_Email || all_Users_With_Given_Email.length != 1) {
        return res.send("Email or Password incorrect, try again !");
       
    }

    const safetoDelete:boolean = bcrypt.compareSync(user_password, all_Users_With_Given_Email[0].dataValues.user_password);

    if (!safetoDelete) 
        res.send("Email or Password incorrect, try again !");
     
   

    //now we can delelte safely all user activities before deleting it itself
    
    //delete user likes ,delete user hikes and delete user posts concurrently as we don't need to await them ( each one doesn't depend in the other)

    await Promise.all([
        myModels.Like.destroy({where:{user_id:user_id}}),
        myModels.Hike.destroy({where:{user_id:user_id}}),
        myModels.Post.destroy({where:{user_id:user_id}})

    ]
    )
    

    //delete now user
    await myModels.User.destroy({where:{user_email:user_email}})


    //set user session flags to null  <--> session killed
    req.session.active_user_email = null;
    req.session.active_user_id = null;

    res.send("Successfuly signed  out.")

};
