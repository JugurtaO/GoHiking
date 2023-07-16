import { NextFunction, Request, Response } from "express";
import * as myModels from "../../models/index";


export const deleteTrail =  async (req: Request, res: Response,next:NextFunction) => {

    const { trail_id } = req.params;

    //delete hikes and reviews referencing corresponding trail before deleting it itself

    Promise.all([
        myModels.Hike.destroy({where:{trail_id:trail_id}}),
        myModels.Review.destroy({where:{trail_id:trail_id}})

    ]).then(data=>{
        myModels.Trail.destroy({ where: { trail_id: trail_id } });
        req.flash("success",`Successfuly deleted trail`);
        return res.redirect("/trails");
        
          

    }).catch(err=>{
        return next(err);
    })








};