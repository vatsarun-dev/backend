import cartModel from "../models/cart.model.js";

export default class CartRepo {
  async addToCart(product) {
    return await cartModel.create(product);
  }

  async removeItemFromCart(userId, productId) {
    return await cartModel.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true },
    );
  }

  async findOne(userId) {
    return await cartModel.findOne({ user: userId });
  }

  async findOnePopulated(userId) {
    return await cartModel
      .findOne({ user: userId })
      .populate("items.product", "title price discountPrice images brand category stock");
  }
}
