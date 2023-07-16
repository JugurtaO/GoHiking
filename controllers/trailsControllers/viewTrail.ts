import { NextFunction, Request, Response } from "express";
import * as myModels from "../../models/index";

export const viewTrail = async (req: Request, res: Response,next:NextFunction) => {

    const { trail_id } = req.params;

    const trail = myModels.Trail.findOne({ where: { trail_id: trail_id } });

    trail.then(async Trail => {
        if (Trail === null){
            req.flash("danger",`No trail was found !`);
            return res.redirect("/trails");
            
        }
       

        
            
        // load all trail reviews & their author| no need to await the operation
        const allReviews = await myModels.Review.findAll({include:{model:myModels.User},where: { trail_id: trail_id }, limit: 20 });
        
        return res.render("viewTrail", { Trail, allReviews });
        


    }).catch(err => {
        return next(err);
    });





};