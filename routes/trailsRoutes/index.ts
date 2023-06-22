import express from "express";
import * as trailControllers from "../../controllers/trailsControllers/index";
import * as reviewControllers from "../../controllers/reviewsControllers/index";


const trailRouter=express.Router();


trailRouter.get("/",trailControllers.allTrails);
trailRouter.get("/:trail_id",trailControllers.viewTrail);
trailRouter.get("/:trail_id/reviews/",reviewControllers.allReviews);

trailRouter.post("/add",trailControllers.addTrail);
trailRouter.post("/:trail_id/delete",trailControllers.deleteTrail);

trailRouter.post("/:trail_id/reviews/add",reviewControllers.addReview);
trailRouter.post("/:trail_id/reviews/:review_id/edit",reviewControllers.editReview);
trailRouter.post("/:trail_id/reviews/:review_id/delete",reviewControllers.deleteReview);


export default trailRouter;