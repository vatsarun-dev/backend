import UserRepo from "../../repository/user.repo.js";
import * as error from "../../shared/error/globalError.js";
import * as token from "../../utils/generateToken.js";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import bcrypt from "bcrypt";
import CartRepo from "../../repository/cart.repo.js";
import productModel from "../../models/product.model.js";
export default class UserService {
  constructor() {
    this.userService = new UserRepo();
    this.cartService = new CartRepo();
  }
  // THIS IS THE REGISTRATION LOGIC
  async createUserService(data) {
    let { name, email, password, mobile, addresses } = data;
    if (!name || !email || !password || !mobile)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.userService.findByEmail(email);
    if (isExisted) throw new error.ALLREADYEXIST("User is already existed");
    const user = await this.userService.createUser({ ...data, role: "user" });
    const accessToken = token.generateAccessToken(user._id);
    const refreshToken = token.generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, user };
  }

  // THIS IS LOGIN LOGIC
  async loginUserService(data) {
    let { email, password } = data;

    if (!email || !password)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.userService.findByEmail(email);
    if (!isExisted) throw new error.NOTFOUNDERROR("user not found");

    const compare = isExisted.comparePassword(password);

    if (!compare) throw new error.UNAUTHORIZED("Wrong Credential");

    const accessToken = token.generateAccessToken(isExisted._id);
    const refreshToken = token.generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    return { accessToken, refreshToken, isExisted };
  }

  async addToCartService(productId, userId) {
    const product = await productModel.findById(productId);
    if (!product) throw new error.NOTFOUNDERROR("product not found");

    const cart = await this.cartService.findOne(userId);

    if (!cart)
      return await this.cartService.addToCart({
        user: userId,
        items: [
          {
            product: product,
            quantity: 1,
          },
        ],
        totalPrice: product.price,
      });

    const existed = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (existed) {
      existed.quantity++;
      cart.totalPrice += product.price;
      await cart.save();
      return cart;
    }
    cart.items.push({
      product: product,
      quantity: 1,
    });
    cart.totalPrice += product.price;
    await cart.save();
    return cart;
  }

  async removeToCartService(productId, userId) {
    const product = await productModel.findById(productId);
    if (!product) throw new error.NOTFOUNDERROR("product not found");
    const cart = await this.cartService.findOne(userId);

    if (!cart) throw new error.NOTFOUNDERROR("no cart found");
    const existed = cart.items.find(
      (item) => item.product.toString() === productId,
    );
    if (!existed) throw new error.NOTFOUNDERROR("product not in cart");

    if (existed.quantity == 1) {
      const updatedCart = await this.cartService.removeItemFromCart(
        userId,
        productId,
      );
      updatedCart.totalPrice -= product.price * existed.quantity;
      await updatedCart.save();
      return updatedCart;
    }
    existed.quantity--;
    cart.totalPrice -= product.price * existed.quantity;
    await cart.save();
    return cart;
  }
}
