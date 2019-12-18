import { getEnv } from "../lib/env";
export const ENVIRONMENT = getEnv("NODE_ENV");
export const ERROR_CODES = {
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409
};
export const ERROR_TEXTS = {
  USER_ALREADY_EXIST: "User already exist.",
  INVALID_USER: "Invalid user details.",
  OUT_OF_STOCK: "product out of stock.",
  SOMETHING_WRONG: "Something Went wrong",
  ORDER_NOT_FOUND: "Order details not found."
};
export const STATUS = {
  INACTIVE: 0,
  ACTIVE: 1
};
export const ACTIVE = "ACTIVE";
export const INACTIVE = "INACTIVE";

export const PAGINATION_LIMITS = {
  DEFAULT: 10,
  PAGE: 1
};
