import { Request,Response } from "express";
import * as myModels from "../../models/index";

export const viewTrails= async (req:Request,res:Response)=>{
    
    const {user_id}=req.params;
    
    //no need to await the operation
    const allTrails=await myModels.Trail.findAll({where:{author_id:user_id}});

    if (!allTrails.length)
        return res.send("No trail was found, login and let's create one.")



    return res.json(allTrails);



};