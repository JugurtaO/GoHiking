import { NextFunction, Request,Response } from "express";
import * as myModels from "../../models/index";
import bcrypt from "bcryptjs";

export const postSignout= async (req:Request,res:Response,next:NextFunction)=>{

    const { user_email, user_password } = req.body;
    const user_id = req.session.active_user_id;


    if(!user_email.length ||!user_password.length)
    {
        req.flash("danger","credentials can not be blank!");
        return res.redirect("/users/signout");
    }
        
    
    const all_Users_With_Given_Email= await myModels.User.findAll({where:{user_email:user_email}});

    if (!all_Users_With_Given_Email || all_Users_With_Given_Email.length != 1) {
        req.flash("danger","Email or Password incorrect, try again !");
        return res.redirect("/users/signout");
       
    }

    const safetoDelete:boolean = bcrypt.compareSync(user_password, all_Users_With_Given_Email[0].dataValues.user_password);

    if (!safetoDelete)
    {
        req.flash("danger","Email or Password incorrect, try again !");
        return res.redirect("/users/signout");
       
    } 
       
     
   

    //now we can delelte safely all user activities before deleting it itself
    
    //delete user hikes and delete created user trails concurrently as we don't need to await them ( each one doesn't depend on the other)

    Promise.all([
        myModels.Hike.destroy({where:{user_id:user_id}}),
        myModels.Trail.destroy({where:{author_id:user_id}}),
        myModels.Review.destroy({where:{author_id:user_id}})

    ]).then(data=>{
        //now delete user
        myModels.User.destroy({where:{user_email:user_email}});
        


        //set user session flags to null  <--> session killed
        req.session.active_user_email = null;
        req.session.active_user_id = null;
        req.session.active_user_nickname=null;
    
    
        
        req.flash("success","Successfuly signed  out. Good Bye!");
        res.redirect("/users/signup");

    })
    .catch(err=>{
        return next(err);
    })


};
