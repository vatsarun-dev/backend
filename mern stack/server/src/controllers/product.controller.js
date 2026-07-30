import store from "../data/store.js";
import ApiError from "../utils/ApiError.js";

export async function getProducts(req, res) {
  const { category, search } = req.query;
  let products = [...store.products];

  if (category) {
    products = products.filter((item) => item.category === category);
  }

  if (search) {
    const term = search.toLowerCase();
    products = products.filter((item) =>
      item.name.toLowerCase().includes(term),
    );
  }

  res.json({
    success: true,
    count: products.length,
    data: products,
  });
}

export async function getProductById(req, res) {
  const product = store.products.find((item) => item.id === req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.json({ success: true, data: product });
}

export async function createProduct(req, res) {
  const product = {
    id: store.createId(),
    name: req.body.name,
    price: Number(req.body.price),
    category: req.body.category,
    stock: Number(req.body.stock),
  };

  store.products.push(product);

  res.status(201).json({
    success: true,
    message: "Product created",
    data: product,
  });
}

export async function updateProduct(req, res) {
  const product = store.products.find((item) => item.id === req.params.id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  product.name = req.body.name ?? product.name;
  product.price = req.body.price ?? product.price;
  product.category = req.body.category ?? product.category;
  product.stock = req.body.stock ?? product.stock;

  res.json({
    success: true,
    message: "Product updated",
    data: product,
  });
}

export async function deleteProduct(req, res) {
  const index = store.products.findIndex((item) => item.id === req.params.id);

  if (index === -1) {
    throw new ApiError(404, "Product not found");
  }

  const [removed] = store.products.splice(index, 1);

  res.json({
    success: true,
    message: "Product deleted",
    data: removed,
  });
}
