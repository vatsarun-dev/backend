import store from "../data/store.js";
import ApiError from "../utils/ApiError.js";

export async function getOrders(req, res) {
  let orders = [...store.orders];

  if (req.user.role !== "admin") {
    orders = orders.filter((order) => order.userId === req.user.id);
  }

  res.json({
    success: true,
    count: orders.length,
    data: orders,
  });
}

export async function getOrderById(req, res) {
  const order = store.orders.find((item) => item.id === req.params.id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (req.user.role !== "admin" && order.userId !== req.user.id) {
    throw new ApiError(403, "Not allowed to view this order");
  }

  res.json({ success: true, data: order });
}

export async function createOrder(req, res) {
  const { items } = req.body;

  const orderItems = items.map((item) => {
    const product = store.products.find((p) => p.id === item.productId);

    if (!product) {
      throw new ApiError(404, `Product not found: ${item.productId}`);
    }

    if (product.stock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for ${product.name}`);
    }

    product.stock -= item.quantity;

    return {
      productId: product.id,
      quantity: item.quantity,
      price: product.price,
    };
  });

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const order = {
    id: store.createId(),
    userId: req.user.id,
    items: orderItems,
    total,
    status: "pending",
  };

  store.orders.push(order);

  res.status(201).json({
    success: true,
    message: "Order placed",
    data: order,
  });
}

export async function updateOrderStatus(req, res) {
  const order = store.orders.find((item) => item.id === req.params.id);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.status = req.body.status ?? order.status;

  res.json({
    success: true,
    message: "Order status updated",
    data: order,
  });
}
