import { Request,Response } from "express";
import * as myModels from "../../models/index";

export const deleteTrail= async (req:Request,res:Response)=>{
    
    const {trail_id}=req.params;
    
    //no need to await the operation
    myModels.Trail.destroy({where:{trail_id:trail_id}});


    return res.send("OK.")



};