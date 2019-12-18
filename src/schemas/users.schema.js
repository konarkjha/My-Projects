import BaseModel from "../models/BaseModel";
import Sequelize from "sequelize";
export class UserSchema extends BaseModel {
  constructor(connection) {
    super(connection);
  }
  Users = () => {
    const users = this.connection.define(
      "users",
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        name: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false },
        contactNumber: { type: Sequelize.INTEGER, allowNull: false },
        age: { type: Sequelize.INTEGER, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
        address: { type: Sequelize.STRING },
        lastLogin: {
          type: "TIMESTAMP",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          allowNull: false
        }
      },
      {
        charset: "utf8mb4",
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        tableName: "users"
      }
    );
    return users;
  };
}
export default new UserSchema();
