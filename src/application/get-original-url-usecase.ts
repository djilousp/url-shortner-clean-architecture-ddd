import { ShortUrlError } from "../domain/errors/short-url.error";
import type { UrlRepository } from "../domain/repositories/url-repository";

export class GetOriginalUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(shortCode: string): Promise<string> {
    const shortUrl = await this.urlRepository.urlFromShortCode(shortCode);
    if (!shortUrl) {
      throw ShortUrlError.ShortUrlNotFoundError.byShortCode(shortCode);
    }
    // increase clicks counter for the url
    await this.urlRepository.incrementClicksFor(shortUrl.getId());
    return shortUrl.getOriginalUrl();
  }
}
