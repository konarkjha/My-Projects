import { ApplicationError } from "../lib/errors";
function assertRequiredFields(requiredFields = [], body) {
  const missingFields = requiredFields.filter(field => !body[field]);
  if (missingFields.length > 0) {
    throw new ApplicationError("Missing required fields", 400, {
      requiredFields,
      missingFields
    });
  }
}

export function route(callback, options = {}) {
  return async (req, res, next) => {
    try {
      if (options.requiredFields) {
        assertRequiredFields(options.requiredFields, req.body);
      }
      await callback(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

export function successRoute(data) {
  if (data && data.error) {
    return {
      data: {},
      message: data.error.message,
      statusCode: data.error.errorCode
    };
  }
  return {
    data: data,
    message: "Success",
    statusCode: 200
  };
}
