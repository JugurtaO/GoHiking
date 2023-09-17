import { NextFunction, Request, Response } from "express";
import * as myModels from "../../models/index";

export const editReview = async (req: Request, res: Response,next:NextFunction) => {

    const { new_review_text,new_review_rating }: { new_review_text: String,new_review_rating:String } = req.body;
    const { review_id } = req.params;

    if (!new_review_text.length)
        return res.send("Review cannot be blank, leave something !");

    const allReviews = await myModels.Review.findAll({ where: { review_id: review_id } });


    if (!allReviews.length || allReviews.length != 1)
        return res.send("no review found with given data");

    if (allReviews[0].dataValues.author_id != req.session.active_user_id)
        return res.status(401).send("not authorized to edit review !");


    //UPDATE REVIEW
    myModels.Review.update({review_text:new_review_text,review_rating:new_review_rating},{where:{review_id:review_id}})
    .then(data=>{
        return res.send("OK.")
    }).catch(err=>{
        return res.send("error payload set to"+err);
    })





};