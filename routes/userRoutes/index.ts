import express from "express";
import * as userControllers from "../../controllers/userControllers/index";
import * as trailControllers from "../../controllers/trailsControllers/index";
import { sanitize } from "../../middlewares/sanitization/sanitize";

const userRouter=express.Router();


userRouter.get("/login",userControllers.getLogin);
userRouter.get("/signup",userControllers.getSignup);
userRouter.get("/profile",userControllers.getProfile);
userRouter.get("/signout",userControllers.getSignout);
userRouter.get("/trails",trailControllers.userTrails);



userRouter.post("/login",  sanitize,userControllers.postLogin);
userRouter.post("/signup", sanitize,userControllers.postSignup);
userRouter.post("/logout", sanitize,userControllers.postLogout);
userRouter.post("/signout",sanitize,userControllers.postSignout);






export default userRouter;
