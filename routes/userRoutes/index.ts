import express from "express";
import * as userControllers from "../../controllers/userControllers/index";
import * as trailControllers from "../../controllers/trailsControllers/index";


const userRouter=express.Router();


userRouter.get("/login",userControllers.getLogin);
userRouter.get("/signup",userControllers.getSignup);
userRouter.get("/profile",userControllers.getProfile);
userRouter.get("/signout",userControllers.getSignout);
userRouter.get("/trails",trailControllers.userTrails);



userRouter.post("/login",userControllers.postLogin);
userRouter.post("/signup",userControllers.postSignup);
userRouter.post("/logout",userControllers.postLogout);
userRouter.post("/signout",userControllers.postSignout);






export default userRouter;
