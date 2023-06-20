import express from "express";
import userRoutes from "./userRoutes/index";
import otherRoutes from "./otherRoutes/index";
import reviewRoutes from "./reviewsRoutes/index";


const Router=express.Router();


Router.use("/",otherRoutes);
Router.use("/users",userRoutes);   //trailRoutes are included in user's ones
Router.use('/trails',reviewRoutes);



export default Router;
