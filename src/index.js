import "babel-polyfill";
import express from "express";
import http from "http";
import cors from "cors";
import { getEnv } from "./lib/env";
import createRouter from "./router";
const app = express();
app.use(cors({ origin: "*" }));
app.use(createRouter());
console.log(getEnv("NODE_ENV"));
const port = 3000;
http
  .createServer(app)
  .listen(port, () => console.log(`Listening on port ${port}`));
