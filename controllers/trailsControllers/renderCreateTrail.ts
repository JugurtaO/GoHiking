import { Request, Response } from "express";

export const renderCreateTrail = (req:Request,res:Response)=>{
     res.render("createTrail");
};

