import { Request, Response } from "express";
import * as myModels from "../../models/index";

export const userTrails = (req: Request, res: Response) => {

    const  user_id  = req.session.active_user_id;


    const Trails = myModels.Trail.findAll({ where: { author_id: user_id } });
    Trails.then(allTrails => {
        if (!allTrails.length)
            return res.send("No trail was found, login and let's create one.")



        return res.json(allTrails);

    }).catch(err => {
        return res.send("error payload set to"+ err);
    });





};