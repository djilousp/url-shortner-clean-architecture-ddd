import type { Request, Response } from "express";
import config from "config";
import type { ShortenUrlUseCase } from "../../application/shorten-url-usecase";
import type { GetOriginalUrlUseCase } from "../../application/get-original-url-usecase";

type ShortenedURLDTO = {
  shortUrl: string;
};

const APP_URL = config.get("app.url");
const toShortURLDTO: (shortCode: string) => ShortenedURLDTO = (shortCode: string) => ({
  shortUrl: `${APP_URL}/${shortCode}`
});
export class UrlController {
  private readonly shortenUrlUseCase: ShortenUrlUseCase;
  getOriginalUrlUseCase: GetOriginalUrlUseCase;
  constructor(shortenUrlUseCase: ShortenUrlUseCase, getOriginalUrlUseCase: GetOriginalUrlUseCase) {
    this.shortenUrlUseCase = shortenUrlUseCase;
    this.getOriginalUrlUseCase = getOriginalUrlUseCase;
  }
  async onShorten(req: Request, res: Response): Promise<void> {
    const shortCode = await this.shortenUrlUseCase.execute(req.body.longUrl);
    res.status(200).send(toShortURLDTO(shortCode));
  }

  async onURLRedirect(req: Request, res: Response): Promise<void> {
    const originalUrl = await this.getOriginalUrlUseCase.execute(req.params.shortCode);
    res.redirect(originalUrl);
  }
}
