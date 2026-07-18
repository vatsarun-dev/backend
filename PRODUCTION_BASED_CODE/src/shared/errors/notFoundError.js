import ApiError from "./ApiError.js";
import { StatusCodes } from "http-status-codes";
export class NotFoundError extends ApiError {
  constructor(message, statusCode) {
    super(message, StatusCodes.NOTFOUND);
  }
}

export class UnAuthorized extends ApiError {
  constructor(message, statusCode) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
