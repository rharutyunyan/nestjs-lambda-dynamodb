import { Injectable, NestMiddleware } from '@nestjs/common';

import * as cls from 'cls-hooked';
import { v4 as uuid } from 'uuid';

import { ServiceContext, SERVICE_CONTEXT_KEY } from '../context/service.context';

export const HEADER_X_CORRELATION_ID: string = 'x-correlation-id';

@Injectable()
export class ServiceContextMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: any) {
    const session =
      cls.getNamespace(SERVICE_CONTEXT_KEY) || cls.createNamespace(SERVICE_CONTEXT_KEY);
    const correlationId = req.headers[HEADER_X_CORRELATION_ID] || uuid();
    const svcCtx = new ServiceContext(correlationId);

    session.run(async () => {
      session.set(ServiceContext.name, svcCtx);
      next();
    });
  }
}
