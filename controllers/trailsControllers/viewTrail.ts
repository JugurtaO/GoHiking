import { Request, Response } from "express";
import * as myModels from "../../models/index";

export const viewTrail = (req: Request, res: Response) => {

    const { trail_id } = req.params;

    const trail = myModels.Trail.findOne({ where: { trail_id: trail_id } });

    trail.then(Trail => {
        if (trail === null)
            return res.send("No trail was found, login and let's create one.")

        return res.json(Trail);

    }).catch(err => {
        return res.send("error payload set to"+ err);
    });





};