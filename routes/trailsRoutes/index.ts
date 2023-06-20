import express from "express";
import * as userControllers from "../../controllers/userControllers/index";
import * as trailControllers from "../../controllers/trailsControllers/index";


const trailRouter=express.Router();


trailRouter.get("/",trailControllers.allTrails);
trailRouter.get("/:trail_id",trailControllers.viewTrail);

trailRouter.post("/add",trailControllers.addTrail);
trailRouter.post("/:trail_id/delete",trailControllers.deleteTrail);

export default trailRouter;