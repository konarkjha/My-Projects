import BaseModel from "../models/BaseModel";
import Sequelize from "sequelize";
export class InventorySchema extends BaseModel {
  constructor(connection) {
    super(connection);
  }
  Inventory = () => {
    const inventory = this.connection.define(
      "inventory",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        productId: { type: Sequelize.INTEGER, allowNull: false },
        quantity: { type: Sequelize.INTEGER, allowNull: false }
      },
      {
        charset: "utf8mb4",
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "inventory"
      }
    );
    return inventory;
  };
}
export default new InventorySchema();
