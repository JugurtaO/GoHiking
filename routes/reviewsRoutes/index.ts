import express from "express";
import * as reviewControllers from "../../controllers/reviewsControllers/index";

const  reviewRouter=express.Router();


reviewRouter.get("/",reviewControllers.allReviews);

reviewRouter.post("/add",reviewControllers.addReview);
reviewRouter.post("/:review_id/edit",reviewControllers.editReview);
reviewRouter.post("/:review_id/delete",reviewControllers.deleteReview);

export default reviewRouter;


