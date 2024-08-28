import { ShortUrl } from "../entities/shorturl";

export interface UrlRepository {
  saveUrl: (url: ShortUrl) => Promise<void>;
  urlFromShortCode: (shortCode: string) => Promise<ShortUrl | null>;
  shortCodeExists: (shortCode: string) => Promise<boolean>;
  incrementClicksFor: (shortUrlId: string) => Promise<void>;
}
