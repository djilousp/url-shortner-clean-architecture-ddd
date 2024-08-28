import { ShortUrl } from "../../../domain/entities/shorturl";
import { ShortUrlClick } from "../../../domain/entities/shorturl-click";
import { UrlRepository } from "../../../domain/repositories/url-repository";

export class InMemoryRepository implements UrlRepository {
  shortUrlsDataSource = new Map<string, ShortUrl>();
  async saveUrl(url: ShortUrl): Promise<void> {
    this.shortUrlsDataSource.set(url.getShortCode(), url);
  }

  async urlFromShortCode(shortCode: string): Promise<ShortUrl | null> {
    if (this.shortUrlsDataSource.has(shortCode)) {
      return this.shortUrlsDataSource.get(shortCode) as ShortUrl;
    }
    return null;
  }
  async shortCodeExists(shortCode: string): Promise<boolean> {
    return this.shortUrlsDataSource.has(shortCode);
  }
  async incrementClicksFor(shortUrlId: string): Promise<void> {
    // @ts-ignore
    const [_, shortUrl] = Array.from(this.shortUrlsDataSource.entries()).find(entry => {
      const value = entry[1];
      return value.getId() === shortUrlId;
    });
    if (shortUrl) {
      shortUrl.clicks.push(ShortUrlClick.fromAccessTime(new Date()));
    }
  }
}
