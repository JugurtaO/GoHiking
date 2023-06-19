import { Request, Response } from "express";
import * as myModels from "../../models/index";

export const deleteTrail = async (req: Request, res: Response) => {

    const { trail_id } = req.params;

    //delete hikes referencing corresponding trail before deleting it itself
    await myModels.Hike.destroy({ where: { trail_id: trail_id } });

    //no need to await the operation
    myModels.Trail.destroy({ where: { trail_id: trail_id } }).then(data => {
        return res.send("OK.")
    }).catch(err => {
        return res.send("error payload set to"+ err);
    });





};