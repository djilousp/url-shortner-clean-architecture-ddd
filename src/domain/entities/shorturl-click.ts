import { randomUUID } from "crypto";

export class ShortUrlClick {
  private readonly id: string;
  private readonly accessedAt: Date;
  private constructor(id: string, accessedAt: Date) {
    this.id = id;
    this.accessedAt = accessedAt;
  }

  static fromAccessTime(accessedAt: Date): ShortUrlClick {
    return new ShortUrlClick(randomUUID(), accessedAt);
  }
}
