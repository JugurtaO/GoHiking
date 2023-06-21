import express from "express";
import * as otherControllers from "../../controllers/otherControllers/index";


const otherRouter=express.Router();



otherRouter.get("/",otherControllers.home);
otherRouter.get("/home",otherControllers.home);
otherRouter.get("/about",otherControllers.about);













export default otherRouter;