import * as cls from 'cls-hooked';

export const SERVICE_CONTEXT_KEY = '__SERVICE_CONTEXT__';
export const CORRELATION_ID_KEY = 'correlationId';

export class ServiceContext {
  constructor(public readonly correlationId: string) {}

  static get current(): ServiceContext {
    const session = cls.getNamespace(SERVICE_CONTEXT_KEY);
    if (session && session.active) {
      return session.get(ServiceContext.name);
    }
    return new ServiceContext(null);
  }
}

export default ServiceContext;
