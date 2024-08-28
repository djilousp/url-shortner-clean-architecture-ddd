import { expect } from "chai";
import { faker } from "@faker-js/faker";
import { InMemoryRepository } from "../src/infrastructure/persistance/repositories/in-memory-repository";
import { ShortenUrlUseCase } from "../src/application/shorten-url-usecase";

describe("Shortening Long URL", () => {
  const inMemoryRepository = new InMemoryRepository();

  it("Generated short Code from long URL", async () => {
    const longURL = faker.internet.url();
    const shortenUrlUseCase = new ShortenUrlUseCase(inMemoryRepository);
    const shortCode = await shortenUrlUseCase.execute(longURL);

    expect(shortCode).to.be.string;
    expect(shortCode.length).to.be.eq(7);
  });
});
