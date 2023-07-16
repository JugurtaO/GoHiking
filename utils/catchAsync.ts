import { Request, Response, NextFunction } from 'express';

export function catchAsync(fn:Function){
  return function (req:Request,res:Response,next:NextFunction){
    fn(req,res,next).catch((e:Error)=>next(e));
  }
}








