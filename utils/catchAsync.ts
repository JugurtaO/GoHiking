import { Request, Response, NextFunction } from 'express';

// export const  catchAsync= (fn:Function) =>{
  
//      return function (req:Request,res:Response,next:NextFunction){
//     fn(req,res,next).catch((err:Error)=>next(err));
//   }

// }


export const catchAsync = (fn: (req: Request, res:Response, next: NextFunction) => Promise<any>) => {
  return function(req: Request, res: Response, next: NextFunction) {
      fn(req, res, next).catch((e: Error) => {
          return next(e);
      });
  };
};








