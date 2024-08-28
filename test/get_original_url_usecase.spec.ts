import { expect } from 'chai';
import { faker } from '@faker-js/faker';
import { InMemoryRepository } from '../src/infrastructure/persistance/repositories/in-memory-repository';
import { ShortenUrlUseCase } from '../src/application/shorten-url-usecase';
import { GetOriginalUrlUseCase } from 'src/application/get-original-url-usecase';

describe('Redirect to Long URL', () => {
  const inMemoryRepository = new InMemoryRepository();

  it('Should Increment clicks counts for a shortened URL', async () => {
    const longURL = faker.internet.url();
    const shortenUrlUseCase = new ShortenUrlUseCase(inMemoryRepository);
    const shortCode = await shortenUrlUseCase.execute(longURL);
    const getOriginalUrlUseCase = new GetOriginalUrlUseCase(inMemoryRepository);
    const originalUrl = await getOriginalUrlUseCase.execute(shortCode);
    const shortUrl = await inMemoryRepository.urlFromShortCode(shortCode);

    expect(originalUrl).to.equal(longURL);
    expect(shortUrl).to.not.be.null;
    expect(shortUrl?.countClicks()).to.equal(1);
  });
});
