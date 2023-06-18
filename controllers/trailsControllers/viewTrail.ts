import { Request,Response } from "express";
import * as myModels from "../../models/index";

export const viewTrail= async (req:Request,res:Response)=>{
    
    const {trail_id}=req.params;
    
    const trail=await myModels.Trail.findOne({where:{trail_id:trail_id}});

    if (trail===null)
        return res.send("No trail was found, login and let's create one.")



    return res.json(trail);



};