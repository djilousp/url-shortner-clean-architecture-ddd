import { EntityError } from './base.error';

export namespace ShortUrlError {
  export class ShortUrlNotFoundError extends EntityError {
    static byShortCode(shortCode: string): ShortUrlNotFoundError {
      return new ShortUrlNotFoundError(
        'ShortUrl',
        `No URL found for short code, shortCode=${shortCode}`
      );
    }
  }

  export class InvalidLongUrlError extends EntityError {}
}
