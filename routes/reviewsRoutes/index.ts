import express from "express";
import * as reviewControllers from "../../controllers/reviewsControllers/index";

const  reviewRouter=express.Router();


reviewRouter.get("/reviews",reviewControllers.allReviews);

reviewRouter.post("/reviews/add",reviewControllers.addReview);
reviewRouter.post("/reviews/:review_id/edit",reviewControllers.editReview);
reviewRouter.post("/reviews/:review_id/delete",reviewControllers.deleteReview);

export default reviewRouter;


