import { Request,Response } from "express";
import * as myModels from "../../models/index";


export const checkAuthorizationForTrail = (req:Request,res:Response,next:Function) =>{
   
    const {trail_id}=req.params;

    if(!req.session?.active_user_email){
        req.flash("danger", "Please log in to proceed.");
        return res.redirect("/users/login");
    }
  

    const trail=myModels.Trail.findOne({where:{trail_id:trail_id}});
    trail.then(data=>{
        if(req.session.active_user_id== data.dataValues.author_id){
            return next();
        }else{
            req.flash("danger", "Not authorized!");
            return res.status(401).redirect(`/trails/${trail_id}`);
        }


    }).catch(err=>{
        res.send("Error payload set to"+ err);
    })

   
    
}


export const checkAuthorizationForReview = (req:Request,res:Response,next:Function) =>{
   
    const {review_id,trail_id}=req.params;

    if(!req.session?.active_user_email){
        req.flash("danger", "Please log in to proceed.");
        return res.redirect("/users/login");
    }
  

    const review=myModels.Review.findOne({where:{review_id:review_id}});
    review.then(data=>{
        if(req.session.active_user_id== data.dataValues.author_id){
            return next();
        }else{
            req.flash("danger", "Not authorized!");
            return res.status(401).redirect(`/trails/${trail_id}`);
        }


    }).catch(err=>{
        res.send("Error payload set to"+ err);
    })

   
    
}