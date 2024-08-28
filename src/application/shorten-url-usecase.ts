import { randomUUID } from "crypto";
import { customAlphabet } from "nanoid";
import { ShortUrl } from "../domain/entities/shorturl";
import type { UrlRepository } from "../domain/repositories/url-repository";
import { OriginalUrl } from "../domain/value-objects/original-url";
import { GenericError } from "../domain/errors/generic.error";

const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  7
);

export class ShortenUrlUseCase {
  constructor(private urlRepository: UrlRepository) {}

  async execute(originalUrl: string): Promise<string> {
    // check if the original url is acceptable
    OriginalUrl.from(originalUrl);
    const shortCode = nanoid();
    const shortCodeExists = await this.urlRepository.shortCodeExists(shortCode);
    if (shortCodeExists) {
      throw GenericError.for("ShortUrl", "shortCodeExists");
    }
    const shortUrl = ShortUrl.from(randomUUID(), shortCode, originalUrl);
    await this.urlRepository.saveUrl(shortUrl);
    return shortCode;
  }
}
