import { StatusCodes } from "http-status-codes";
import ApiError from "./ApiError.js";

export class NOTFOUNDERROR extends ApiError {
  constructor(message, statusCode) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
export class UNAUTHORIZED extends ApiError {
  constructor(message, statusCode) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
export class ALLREADYEXIST extends ApiError {
  constructor(message, statusCode) {
    super(message, StatusCodes.CONFLICT);
  }
}
export class PAYMENTFAIL extends ApiError {
  constructor(message, statusCode) {
    super(message, StatusCodes.PAYMENT_REQUIRED);
  }
}
