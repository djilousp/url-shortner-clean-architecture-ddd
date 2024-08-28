import { randomUUID } from "crypto";
import { OriginalUrl } from "../value-objects/original-url";
import { ShortUrlClick } from "./shorturl-click";

export class ShortUrl {
  private readonly id: string;
  private readonly shortCode: string;
  private readonly originalUrl: OriginalUrl;
  public clicks: ShortUrlClick[];

  private constructor(
    id: string,
    shortCode: string,
    originalUrl: OriginalUrl,
    clicks: ShortUrlClick[]
  ) {
    this.id = id;
    this.shortCode = shortCode;
    this.originalUrl = originalUrl;
    this.clicks = clicks;
  }
  getId(): string {
    return this.id;
  }
  getShortCode(): string {
    return this.shortCode;
  }
  getOriginalUrl(): string {
    return this.originalUrl.Value();
  }

  countClicks(): number {
    return this.clicks.length;
  }

  static from(
    id: string = randomUUID(),
    shortCode: string,
    originalUrl: string,
    clicks: ShortUrlClick[] = []
  ): ShortUrl {
    const originalAcceptedUrl = OriginalUrl.from(originalUrl);
    return new ShortUrl(id, shortCode, originalAcceptedUrl, clicks);
  }
}
