import { Router } from "express";
import { rateLimiterMiddleware } from "../middlewares/rate-limiter";
import { UrlController } from "../controllers/url.controller";
import { MysqlUrlRepository } from "../../infrastructure/persistance/repositories/mysql-repository";
import { ShortenUrlUseCase } from "../../application/shorten-url-usecase";
import { GetOriginalUrlUseCase } from "../../application/get-original-url-usecase";
import { Validator } from "../middlewares/validator";
import { longUrlSchema, shortCodeSchema } from "../schemas/ulr.schema";
import { tryCatch } from "../middlewares/utils/try-catch";

const mysqlRepo = new MysqlUrlRepository();
const shortenUrlUseCase = new ShortenUrlUseCase(mysqlRepo);
const getOriginalUrlUseCase = new GetOriginalUrlUseCase(mysqlRepo);
const urlController = new UrlController(
  shortenUrlUseCase,
  getOriginalUrlUseCase
);

const router = Router();
router.post(
  "/shorten",
  Validator(longUrlSchema),
  rateLimiterMiddleware,
  tryCatch(urlController.onShorten.bind(urlController))
);

router.get(
  "/:shortCode",
  Validator(shortCodeSchema),
  tryCatch(urlController.onURLRedirect.bind(urlController))
);

export default router;
