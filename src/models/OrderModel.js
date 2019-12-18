import BaseModel from "./BaseModel";
import OrderSchema from "../schemas/orders.schama.js";
import InventorySchema from "../schemas/inventory.schema.js";
import OrderDetailsSchema from "../schemas/orderdetail.schema.js";
import { ApplicationError } from "../lib/errors";
import { ERROR_CODES, ERROR_TEXTS } from "../lib/constants";
export default class OrderModel extends BaseModel {
  constructor(connection) {
    super("orders", connection);
    this.schema = OrderSchema.Order();
    this.name = "orders";
    this.db = this.connection;
    this.model = this.connection.model(this.name, this.schema);
    this.OrderDetailsSchema = OrderDetailsSchema.OrderDetails();
    this.inventorySchema = InventorySchema.Inventory();
    this.OrderDetailsModel = this.connection.model(
      "order_details",
      this.OrderDetailsSchema
    );
    this.inventoryModel = this.connection.model(
      "inventory",
      this.inventorySchema
    );
  }

  async placeOrder(orderInfo) {
    try {
      const orderDetails = await this.model.create(orderInfo);
      return orderDetails;
      orderInfo.orderDetails.map(async order => {
        await this.checkInventory(order.productId, order.quantity);
      });
      //   orderInfo.orderDetails.orderId =orderDetails.map(order=> return order.id)
      await this.OrderDetailsModel.bulkCreate(orderInfo.orderDetails);
      return orderDetails;
    } catch (error) {
      throw error;
    }
  }

  async checkInventory(productId, quantity) {
    const inventoryDetails = await this.inventoryModel.findOne({
      where: { productId: productId }
    });
    if (inventoryDetails && inventoryDetails.quantity <= quantity) {
      throw new ApplicationError(
        ERROR_TEXTS.OUT_OF_STOCK,
        ERROR_CODES.BAD_REQUEST
      );
    }
    const newQuantity = inventoryDetails.quantity - quantity;
    const updateInventoryQuantity = await this.inventoryModel.update({
      quantity: newQuantity,
      where: { productId: productId }
    });
    if (!updateInventoryQuantity[0]) {
      throw new ApplicationError(
        ERROR_TEXTS.SOMETHING_WRONG,
        ERROR_CODES.BAD_REQUEST
      );
    }
    return true;
  }
  async getOrderDetails(orderId) {
    try {
      this.model.hasMany(this.OrderDetailsModel, {
        foreignKey: "orderId",
        targetKey: "id"
      });
      const orderDetails = await this.model.findAll({
        attributes: { exclude: ["updatedAt", "deletedAt"] },
        include: [
          {
            model: this.OrderDetailsModel,
            attributes: { exclude: ["updatedAt", "deletedAt"] }
          }
        ],
        where: { id: orderId }
      });
      if (!orderDetails) {
        throw new ApplicationError(
          ERROR_TEXTS.ORDER_NOT_FOUND,
          ERROR_CODES.BAD_REQUEST
        );
      }
      return orderDetails;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
