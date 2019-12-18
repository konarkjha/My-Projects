import BaseModel from "../models/BaseModel";
import Sequelize from "sequelize";
export class OrderSchema extends BaseModel {
  constructor(connection) {
    super(connection);
  }
  Order = () => {
    const order = this.connection.define(
      "orders",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        userId: { type: Sequelize.STRING, allowNull: false },
        address: { type: Sequelize.STRING },
        amount: Sequelize.DECIMAL
      },
      {
        charset: "utf8mb4",
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "orders"
      }
    );
    return order;
  };
}
export default new OrderSchema();
