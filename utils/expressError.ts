import { Request, Response,NextFunction } from "express";


class expressError extends Error{
    statusCode: number;
    message: string;

    constructor(message: string, statusCode: number) {
      super();
      this.message=message;
      this.statusCode = statusCode;

    }
  
}

export default expressError;