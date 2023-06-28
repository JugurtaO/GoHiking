import { Request, Response } from "express";
import * as myModels from "../../models/index";
import { Model } from "sequelize";

export const viewTrail = (req: Request, res: Response) => {

    const { trail_id } = req.params;

    const trail = myModels.Trail.findOne({ where: { trail_id: trail_id } });

    trail.then(Trail => {
        if (Trail === null)
            return res.send("No trail was found, login and let's create one.")

        //load all trail reviews
        //no need to await the operation
        const Reviews = myModels.Review.findAll({
            include:{all:true,nested:true}, limit: 5
        });

        Reviews.then(allReviews => {
            console.log(allReviews);
            return res.render("viewTrail", { Trail, allReviews });
        })


    }).catch(err => {
        return res.send("error payload set to " + err);
    });





};