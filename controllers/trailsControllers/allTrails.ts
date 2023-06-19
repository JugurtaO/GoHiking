import { Request, Response } from "express";
import * as myModels from "../../models/index";

export const allTrails = (req: Request, res: Response) => {


    //no need to await the operation
    const Trails = myModels.Trail.findAll();

    Trails.then(allTrails => {

        if (!allTrails.length)
            return res.send("No trail was found, login and let's create one.")


        return res.render("trails", { allTrails });

    }).catch(err => {
        return res.send("error payload set to"+ err);
    })







};