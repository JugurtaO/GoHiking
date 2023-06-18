import express from "express";
import * as otherControllers from "../../controllers/otherControllers/index";
import * as trailControllers from "../../controllers/trailsControllers/index";


const otherRouter=express.Router();



otherRouter.get("/",otherControllers.home);
otherRouter.get("/home",otherControllers.home);
otherRouter.get("/about",otherControllers.about);
otherRouter.get("/trails",trailControllers.allTrails);












export default otherRouter;