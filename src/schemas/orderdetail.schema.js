import BaseModel from "../models/BaseModel";
import Sequelize from "sequelize";
export class OrderDetailsSchema extends BaseModel {
  constructor(connection) {
    super(connection);
  }
  OrderDetails = () => {
    const orderDetails = this.connection.define(
      "order_details",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        orderId: { type: Sequelize.INTEGER, allowNull: false },
        productId: { type: Sequelize.INTEGER, allowNull: false },
        rate: { type: Sequelize.DECIMAL, allowNull: false },
        variant: { type: Sequelize.JSON }
      },
      {
        charset: "utf8mb4",
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "order_details"
      }
    );
    return orderDetails;
  };
}
export default new OrderDetailsSchema();
