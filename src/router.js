import bodyParser from "body-parser";
import express from "express";
import { ApplicationError } from "./lib/errors";

import {
  addUser as createUserRoute,
  getUser as getUserRoute,
  addUsers,
  getAllUsers
} from "./routes/users";

import {
  placeOrder as placeOrderRoute,
  getOrderDetails as getOrderDetailsRoute
} from "./routes/orders";

export default function createRouter() {
  const router = express.Router();
  router.use(bodyParser.json()); // parse json bodies automatically
  router.get("/*", (req, res, next) => {
    res.set({
      "Last-Modified": new Date().toUTCString(),
      Expires: -1,
      "Cache-Control": "must-revalidate, private"
    });
    next();
  });

  router.post("/users", addUsers);
  router.get("/users", getAllUsers);
  router.post("/user", createUserRoute);
  router.get("/user/:userId", getUserRoute);
  router.post("/order", placeOrderRoute);
  router.get("/order/:orderId", getOrderDetailsRoute);

  router.all("/*", (req, res, next) => {
    next(new ApplicationError("Not Found", 404));
  });

  // catch all ApplicationErrors, then output proper error responses.
  router.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).send({
        message: err.message,
        statusCode: err.statusCode,
        data: err.data || {}
      });
      return;
    }
    res.status(500).send({
      message: "Uncaught error",
      statusCode: 500
    }); // uncaught exception
  });
  return router;
}
