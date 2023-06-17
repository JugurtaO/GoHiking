import express from "express";
import * as otherControllers from "../../controllers/otherControllers/index";

const otherRouter=express.Router();



otherRouter.get("/",otherControllers.home);
otherRouter.get("/home",otherControllers.home);
otherRouter.get("/aboutUs",otherControllers.aboutUs);











export default otherRouter;