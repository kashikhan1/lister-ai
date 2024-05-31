import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export let lastPath: any = null;
@Injectable()
export class SaveOriginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { context } = req.query as any;
    console.log(`.........................`);
    console.log(context, lastPath);
    if (context) {
      lastPath = context;
    } else {
      lastPath = context;
    }
    console.log(`.........................`);
    req.query.context = context || lastPath;
    next();
  }
}
