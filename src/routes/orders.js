import { route, successRoute } from "./";
import OrderModel from "../models/OrderModel";
import { ApplicationError } from "../lib/errors";

const orderModel = new OrderModel();

export const placeOrder = route(
  async (req, res) => {
    try {
      const orderDetails = await orderModel.placeOrder(req.body);
      res.send(successRoute(orderDetails));
    } catch (error) {
      throw error;
    }
  },
  {
    requiredFields: ["userId", "address"]
  }
);

export const getOrderDetails = route(async (req, res) => {
  try {
    const orderDetails = await orderModel.getOrderDetails(req.params.orderId);
    res.send(successRoute(orderDetails));
  } catch (error) {
    throw error;
  }
});
