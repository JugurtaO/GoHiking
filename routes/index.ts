import express from "express";
import userRoutes from "./userRoutes/index";


const Router=express.Router();
Router.use("/users",userRoutes);


export default Router;
