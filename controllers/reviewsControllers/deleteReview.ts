import { Request,Response } from "express";
import * as myModels from "../../models/index";

export const deleteReview= async (req:Request,res:Response)=>{

    const {review_id}=req.params;


    const allReviews=await myModels.Review.findAll({where:{review_id:review_id}});
    
   
    if (!allReviews.length || allReviews.length!=1)
        return res.send("no review found with given data");
    
    if (allReviews[0].dataValues.author_id != req.session.active_user_id)
    return res.status(401).send("not authorized to delete review !");

    const review=myModels.Review.destroy({where:{review_id:review_id}})
    .then(data=>{
        return res.send("OK.");
    }).catch(err=>{
        return res.send("error set to"+err);
    });
  

    

};