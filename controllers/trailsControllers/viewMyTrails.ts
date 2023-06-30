import { Request, Response } from "express";
import * as myModels from "../../models/index";

export const userTrails = (req: Request, res: Response) => {

    const  user_id  = req.session.active_user_id;


    const Trails = myModels.Trail.findAll({ where: { author_id: user_id } });
    Trails.then(allTrails => {
        if (!allTrails.length){
        req.flash("danger",`No trail was found, create your first one.`);
        return res.redirect("/trails/new");
        
        }



        return res.json(allTrails);

    }).catch(err => {
        return res.send("error payload set to"+ err);
    });





};