import express from "express";
import * as trailControllers from "../../controllers/trailsControllers/index";
import * as reviewControllers from "../../controllers/reviewsControllers/index";
import { sanitize } from "../../middlewares/sanitization/sanitize";
import {checkLogin} from "../../middlewares/auth/checkLogin";
import { checkAuthorizationForTrail } from "../../middlewares/auth/checkAuthorization";
import { checkAuthorizationForReview } from "../../middlewares/auth/checkAuthorization";


const trailRouter=express.Router();


trailRouter.get("/",checkLogin,trailControllers.allTrails);
trailRouter.get("/new",trailControllers.renderCreateTrail);
trailRouter.get("/:trail_id",sanitize,checkLogin,trailControllers.viewTrail);
trailRouter.get("/:trail_id/reviews",sanitize,checkLogin,reviewControllers.allReviews);

trailRouter.post("/add",sanitize,checkLogin,trailControllers.addTrail);
trailRouter.post("/:trail_id/delete",sanitize,checkLogin,checkAuthorizationForTrail,trailControllers.deleteTrail);

trailRouter.post("/:trail_id/reviews/add",sanitize,reviewControllers.addReview);
trailRouter.post("/:trail_id/reviews/:review_id/edit",sanitize,checkLogin,checkAuthorizationForReview,reviewControllers.editReview);
trailRouter.post("/:trail_id/reviews/:review_id/delete",sanitize,checkLogin,checkAuthorizationForReview,reviewControllers.deleteReview);


export default trailRouter;