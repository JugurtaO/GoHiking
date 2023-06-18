import { Request,Response } from "express";



//notice that i can implement middleware for each type of request according  to the route  structure 

//this one it's an example when the user id is passed in params 
//later i will not do that , i will verify it from session
export const checkAuthorization = (req:Request,res:Response,next:Function) =>{
   
    if(!req.session?.active_user_email){
        // req.flash("danger", "Please log in to proceed.");
        return res.redirect("/users/login");
    }
  
    if(req.session.active_user_id == req.params?.user_id){
        return next();
    }else{
        return res.status(401).send("Not authorized.");
    }
    
}