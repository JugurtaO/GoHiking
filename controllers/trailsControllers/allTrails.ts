import { Request,Response } from "express";
import * as myModels from "../../models/index";

export const allTrails= async (req:Request,res:Response)=>{
    
    
    //no need to await the operation
    const allTrails=await myModels.Trail.findAll();

    if (!allTrails.length)
        return res.send("No trail was found, login and let's create one.")


    return res.render("trails",{allTrails});



};