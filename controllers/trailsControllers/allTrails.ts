import { NextFunction, Request, Response } from "express";
import * as myModels from "../../models/index";


export const allTrails = async (req: Request, res: Response,next:NextFunction) => {


    //no need to await the operation
    const Trails = myModels.Trail.findAll();

    Trails.then(allTrails => {

        if (!allTrails.length) {
            req.flash("danger","No trail was found, login and let's create one.");
            return res.redirect("/trails/new");
        }
        

        
      
        return res.render("trails", { allTrails });

    }).catch(err => {
        return next(err);
    })







};