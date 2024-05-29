import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SaveOriginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.query.origin as string;
    if (origin) {
      console.log(`.........................`);
      console.log(`.........................`);
      console.log(origin);
      console.log(`.........................`);
      console.log(`.........................`);
      (req as any).session.origin = origin;
    }
    next();
  }
}
