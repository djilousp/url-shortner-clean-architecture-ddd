import { ShortUrlError } from "../errors/short-url.error";

export class OriginalUrl {
  private readonly value: string;
  private constructor(value: string) {
    this.value = value;
  }

  static from(input: string): OriginalUrl {
    try {
      new URL(input);
    } catch (error: any) {
      throw new ShortUrlError.InvalidLongUrlError("OriginalUrl", error.message);
    }
    return new OriginalUrl(input);
  }

  Value(): string {
    return this.value;
  }
}
