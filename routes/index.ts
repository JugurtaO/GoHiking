import express from "express";
import userRoutes from "./userRoutes/index";
import otherRoutes from "./otherRoutes";


const Router=express.Router();


Router.use("/",otherRoutes);
Router.use("/users",userRoutes);


export default Router;
