import express from "express";
import * as userControllers from "../../controllers/userControllers/index";


const userRouter=express.Router();


userRouter.get("/login",userControllers.getLogin);
userRouter.get("/signup",userControllers.getSignup);
userRouter.get("/profile",userControllers.getProfile);
userRouter.post("/login",userControllers.postLogin);
userRouter.post("/signup",userControllers.postSignup);






export default userRouter;
