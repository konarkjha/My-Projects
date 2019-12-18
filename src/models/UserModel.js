import BaseModel from "./BaseModel";
import UserSchema from "../schemas/users.schema.js";
import { ApplicationError } from "../lib/errors";
import { hashPassword, comparePassword } from "../lib/crypto";
import { ERROR_CODES, ERROR_TEXTS } from "../lib/constants";
import https from "https";
import _ from "lodash";
export default class UserModel extends BaseModel {
  constructor(connection) {
    super("users", connection);
    this.schema = UserSchema.Users();
    this.name = "users";
    this.db = this.connection;
    this.model = this.connection.model(this.name, this.schema);
  }

  async addUser(userDetails) {
    try {
      const checkUserExist = await this.model.findOne({
        where: { email: userDetails.email }
      });
      if (checkUserExist) {
        throw new ApplicationError(
          ERROR_TEXTS.USER_ALREADY_EXIST,
          ERROR_CODES.CONFLICT
        );
      }

      userDetails.password = await hashPassword(userDetails.password);
      const createdUserInfo = await this.model.create(userDetails);
      delete createdUserInfo.password;
      return createdUserInfo;
    } catch (error) {
      throw error;
    }
  }

  async getUser(userId) {
    try {
      const userDetails = await this.model.findOne({
        attributes: ["id", "name", "contactNumber", "email"],
        where: { id: userId }
      });
      if (!userDetails) {
        throw new ApplicationError(
          ERROR_TEXTS.INVALID_USER,
          ERROR_CODES.BAD_REQUEST
        );
      }
      return userDetails;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  async addUsers(userDetails) {
    try {
      let userDetailList = [];
      https
        .get("https://jsonplaceholder.typicode.com/users", resp => {
          let data = "";
          resp.on("data", chunk => {
            data += chunk;
          });
          resp.on("end", () => {
            userDetailList = JSON.parse(data).data;
            console.log("userDetailList", userDetailList);
            this.model.bulkCreate(userDetailList);
          });
        })
        .on("error", err => {
          console.log("Error: " + err.message);
        });
      return "SUCCESS";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllUsers() {
    try {
      const userDetails = await this.model.findAll().map(values =>
        values.get({
          plain: true
        })
      );
      // const list = _.mapValues(_.groupBy(userDetails, "age"));
      return userDetails;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
