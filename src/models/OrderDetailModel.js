// import BaseModel from "./BaseModel";
// import { ApplicationError } from "../lib/errors";
// import { ERROR_CODES, ERROR_TEXTS } from "../lib/constants";
// import orderDetailsSchema from "../schemas/orderdetail.schema.js"
// export default class OrderDetailsModel extends BaseModel {
//   constructor(connection) {
//     super("order_details", connection);
//     this.schema = orderDetailsSchema.OrderDetails();
//     this.name = "order_details";
//     this.db = this.connection;
//     this.model = this.connection.model(this.name, this.schema);

//   }

//   async placeOrder(orderInfo) {
//     try {
//       const OrderDetailModel = new OrderDetailModel();
//       //   this.model.hasMany(this.OrderDetailsModel, {
//       //     foreignKey: "orderId",
//       //     targetKey: "id"
//       //   });
//       const orderDetails = await this.model.create(orderInfo);
//       await OrderDetailModel.
//       return orderDetails;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getOrderDetails(userId) {
//     try {
//       const userDetails = await this.model.findOne({
//         attributes: ["id", "name", "contactNumber", "email"],
//         where: { id: userId }
//       });
//       if (!userDetails) {
//         throw new ApplicationError(
//           ERROR_TEXTS.INVALID_USER,
//           ERROR_CODES.BAD_REQUEST
//         );
//       }
//       return userDetails;
//     } catch (error) {
//       console.log(error);

//       throw error;
//     }
//   }
// }
