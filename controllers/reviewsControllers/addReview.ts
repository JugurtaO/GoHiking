import { Request,Response } from "express";
import * as myModels from "../../models/index";

export const addReview= (req:Request,res:Response)=>{

    const {review_text}:{review_text:String}= req.body;
    const author_id=req.session.active_user_id;
    const {trail_id}=req.params;
    console.log(" params >>>",req.params);
    console.log("trail_id>>>>",trail_id);
   




    if (!review_text.length)
        return res.send("Review cannot be blank, leave something !");
    
    
    //no need to await the operation the user cannot see the effect behind the scenes
    const newReview= myModels.Review.create({review_text:review_text,author_id:author_id,trail_id:trail_id});
    newReview.then(data=>{
        return res.send("OK.");
    }).catch(err=>{
        return res.send("error set to "+ err);
    });
  

    

};