import { route, successRoute } from "./";
import UserModel from "../models/UserModel";
import { ApplicationError } from "../lib/errors";

const userModel = new UserModel();

export const addUser = route(
  async (req, res) => {
    try {
      const userDetails = await userModel.addUser(req.body);
      res.send(successRoute(userDetails));
    } catch (error) {
      throw error;
    }
  },
  {
    requiredFields: ["name", "password", "email", "contactNumber"]
  }
);

export const getUser = route(async (req, res) => {
  try {
    const userDetails = await userModel.getUser(req.params.userId);
    res.send(successRoute(userDetails));
  } catch (error) {
    throw error;
  }
});

export const addUsers = route(async (req, res) => {
  try {
    const userDetails = await userModel.addUsers(req.body);
    res.send(successRoute(userDetails));
  } catch (error) {
    throw error;
  }
});
export const getAllUsers = route(async (req, res) => {
  try {
    const userDetails = await userModel.getAllUsers();
    res.send(successRoute(userDetails));
  } catch (error) {
    throw error;
  }
});
