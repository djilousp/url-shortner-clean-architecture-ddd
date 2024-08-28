import { Router } from "express";

import urlRouter from "./url.router";
const router = Router();

router.get("/health-check", (req, res) => {
  res.status(200).send({ status: "OK" });
});
router.use("/", urlRouter);

export default router;
