import BaseModel from "./BaseModel";
import UserSchema from "../schemas/users.schema.js";
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
      if (userDetails || !userDetails.length) {
        await this.model.create(userDetails);
      } else {
        await this.model.bulkCreate(userDetails);
      }
      return "SUCCESS";
    } catch (error) {
      throw error;
    }
  }
}
