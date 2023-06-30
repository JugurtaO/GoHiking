import { Request,Response } from "express";
import * as myModels from "../../models/index";

export const addReview= (req:Request,res:Response)=>{

    const {review_text,review_rating}:{review_text:String,review_rating:String}= req.body;
    const author_id=req.session.active_user_id;
    const {trail_id}=req.params;

   




    if (!review_text.length){
        
        req.flash("danger",`Review cannot be blank !`);
        return res.redirect(`/trails/${trail_id}`);
        
    
    }
        
    
    
    //no need to await the operation the user cannot see the effect behind the scenes
    const newReview= myModels.Review.create({review_text:review_text,review_rating:review_rating,author_id:author_id,trail_id:trail_id});
    newReview.then(data=>{
        req.flash("success",`Thank you for leaving a review`);
        return res.redirect(`/trails/${trail_id}`);
        
    }).catch(err=>{
        return res.send("error set to "+ err);
    });
  

    

};