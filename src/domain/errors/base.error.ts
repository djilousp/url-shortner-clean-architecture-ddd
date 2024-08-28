export class EntityError extends Error {
  constructor(readonly entityType: string, ...params: any[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.entityType = entityType;
    this.name = this.constructor.name;
  }
}
