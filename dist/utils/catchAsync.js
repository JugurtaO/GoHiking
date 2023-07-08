"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
// export const  catchAsync= (fn:Function) =>{
//      return function (req:Request,res:Response,next:NextFunction){
//     fn(req,res,next).catch((err:Error)=>next(err));
//   }
// }
const catchAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((e) => {
            return next(e);
        });
    };
};
exports.catchAsync = catchAsync;
