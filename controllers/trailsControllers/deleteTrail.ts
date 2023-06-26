import { Request, Response } from "express";
import * as myModels from "../../models/index";

export const deleteTrail =  (req: Request, res: Response) => {

    const { trail_id } = req.params;

    //delete hikes and reviews referencing corresponding trail before deleting it itself

    Promise.all([
        myModels.Hike.destroy({where:{trail_id:trail_id}}),
        myModels.Review.destroy({where:{trail_id:trail_id}})

    ]).then(data=>{
        myModels.Trail.destroy({ where: { trail_id: trail_id } })
            return res.redirect("trails")

    }).catch(err=>{
        return res.send("error payload set to "+ err);
    })








};