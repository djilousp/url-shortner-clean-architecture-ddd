import { EntityError } from "./base.error";

export class GenericError extends EntityError {
  static for(entityType: string, msg: string): GenericError {
    return new GenericError(
      entityType,
      `Something went wrong with ${entityType}, ${msg}, please try again`
    );
  }
}
