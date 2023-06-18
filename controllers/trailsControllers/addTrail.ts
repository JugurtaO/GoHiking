import { Request,Response } from "express";
import * as myModels from "../../models/index";

export const addTrail= async (req:Request,res:Response)=>{

    const {trail_name ,trail_location ,difficulty_level,trail_image}:{trail_name:String ,trail_location:String ,difficulty_level:String,trail_image:String}= req.body;
    const author_id=req.params.user_id;




    if (!trail_name.length || !trail_location.length || !difficulty_level.length || !trail_image.length)
        return res.send("Trail characteristics cannot be blank!!")
    
    //check wether the wanted trail doesn't not already exist -- if not create new trail 

    const existedTrails = await myModels.Trail.findAll({where:{trail_name:trail_name}});

    if(existedTrails.length)
        return res.send("Trail with given name already exists! ");
    
    
    // now we can create new trail 
    //no need to await the operation the user cannot see the effect behind the scenes
    const newTrail= myModels.Trail.create({trail_name:trail_name ,trail_location:trail_location ,difficulty_level:difficulty_level,trail_image:trail_image,author_id:author_id});

    return res.send("OK.")



};