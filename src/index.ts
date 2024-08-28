import express from "express";
import config from "config";
import router from "./presentation/routes";
import { errorHandler } from "./presentation/middlewares/error-handler";

const PORT = config.get("port");
const app = express();
app.use(express.json());
app.use(router);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
