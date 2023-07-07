import { Request, Response, NextFunction } from 'express';

const func = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  console.log("je suis dans le middlware catchAsync!!!!");
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};

export default func;
