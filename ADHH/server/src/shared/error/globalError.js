import ApiError from "./ApiError.js";
import { StatusCodes } from "http-status-codes";

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
