import express from "express";
import * as reviewControllers from "../../controllers/reviewsControllers/index";

const  reviewRouter=express.Router();


reviewRouter.get("/:trail_id/reviews",reviewControllers.allReviews);

reviewRouter.post("/:trail_id/reviews/add",reviewControllers.addReview);
reviewRouter.post("/:trail_id/reviews/:review_id/edit",reviewControllers.editReview);
reviewRouter.post("/:trail_id/reviews/:review_id/delete",reviewControllers.deleteReview);

export default reviewRouter;


