// cors.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins = ['http://localhost:3000', 'https://fullstack-task-app-beta.vercel.app'];
    const origin = req.headers.origin as string;

    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );
      console.log(origin)
    }
    next();
  }
}
