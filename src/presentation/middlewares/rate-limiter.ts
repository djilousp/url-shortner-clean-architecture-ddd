import type { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const MAX_DURATION = 60; // in sec
const MAX_REQUESTS_PER_WINDOW = 10;

const rateLimiter = new RateLimiterMemory({
  points: MAX_REQUESTS_PER_WINDOW,
  duration: MAX_DURATION
});

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
