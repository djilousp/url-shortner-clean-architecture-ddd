import type { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const MAX_DURATION = 60; // in sec
const MAX_REQUESTS_PER_WINDOW = 10;

const rateLimiter = new RateLimiterMemory({
  points: MAX_REQUESTS_PER_WINDOW,
  duration: MAX_DURATION
});

const userRequests = new Map<string, any>();

class HomeBrowRateLimiter {
  private readonly duration: number;
  private readonly requestsMaxCount: number;
  private readonly usersRequestStorage: Map<string, { numberOfConsumedRequests: number }>;

  constructor(duration: number, requestsMaxCount: number) {
    this.duration = duration;
    this.requestsMaxCount = requestsMaxCount;
    this.usersRequestStorage = new Map();
  }
  async consume(ip: string) {
    const user = this.usersRequestStorage.get(ip);
    if (user) {
      if (user.numberOfConsumedRequests >= this.requestsMaxCount) {
        throw new Error("Max number of requests reached ");
      }
      user.numberOfConsumedRequests = user.numberOfConsumedRequests + 1;
      return user.numberOfConsumedRequests;
    }

    this.usersRequestStorage.set(ip, { numberOfConsumedRequests: 1 });
    setTimeout(() => {
      this.usersRequestStorage.delete(ip);
    }, this.duration);
  }
}
export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter
    .consume(req.ip ?? "")
    .then(rateLimiterRes => {
      res.setHeader("Retry-After", Math.ceil(rateLimiterRes.msBeforeNext / 1000));
      res.setHeader(
        "X-Rate-Limit-Reset",
        new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString()
      );
      next();
    })
    .catch(() => {
      res.status(429).send({ message: "Too Many Requests" });
    });
};
