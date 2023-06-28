import { Request, Response } from "express";
import * as myModels from "../../models/index";

export const allReviews = (req: Request, res: Response) => {

    const {trail_id}=req.params;
    
    //no need to await the operation
    const Reviews = myModels.Review.findAll({where:{trail_id:trail_id}});

    Reviews.then(allReviews => {

        if (!allReviews.length)
            return res.send("No review was found, login and let's create one.")


        return res.json(allReviews );

    }).catch(err => {
        return res.send("error payload set to"+ err);
    })







};