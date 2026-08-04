import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/api";
import Spinner from "../../components/Spinner";

const EMPTY_FORM = {
  title: "",
  description: "",
  brand: "",
  category: "",
  price: "",
  discountPrice: "",
  stock: "",
  images: "",
  ratings: "",
  totalReviews: "",
};

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // "create" | "edit"
  const [mode, setMode] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res.data.product || []);
    } catch {
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openCreate() {
    setForm(EMPTY_FORM);
    setEditId(null);
    setMode("create");
  }

  function openEdit(product) {
    setForm({
      title: product.title || "",
      description: product.description || "",
      brand: product.brand || "",
      category: product.category || "",
      price: product.price || "",
      discountPrice: product.discountPrice || "",
      stock: product.stock || "",
      images: product.images?.join(", ") || "",
      ratings: product.ratings || "",
      totalReviews: product.totalReviews || "",
    });
    setEditId(product._id);
    setMode("edit");
  }

  function closeForm() {
    setMode(null);
    setEditId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    // Convert images string to array and numeric fields
    const payload = {
      ...form,
      price: Number(form.price),
      discountPrice: Number(form.discountPrice),
      stock: Number(form.stock),
      ratings: Number(form.ratings),
      totalReviews: Number(form.totalReviews),
      images: form.images
        ? form.images.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    try {
      if (mode === "create") {
        await createProduct(payload);
        toast.success("Product created!");
      } else {
        await updateProduct(editId, payload);
        toast.success("Product updated!");
      }
      closeForm();
      fetchProducts();
    } catch (err) {
      const msg = err.response?.data?.message || "Operation failed.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    setDeletingId(id);
    try {
      await deleteProduct(id);
      toast.success("Product deleted.");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      const msg = err.response?.data?.message || "Delete failed.";
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <button className="btn-primary btn-admin" onClick={openCreate}>
          + Add Product
        </button>
      </div>

      {/* ── Product Form Modal ── */}
      {mode && (
        <div className="modal-overlay" onClick={closeForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {mode === "create" ? "Create Product" : "Edit Product"}
            </h2>

            <form onSubmit={handleSubmit} className="auth-form">
              {[
                { name: "title", label: "Title", required: true },
                { name: "description", label: "Description", required: true },
                { name: "brand", label: "Brand" },
                { name: "category", label: "Category" },
                { name: "price", label: "Price", type: "number", required: true },
                { name: "discountPrice", label: "Discount Price", type: "number" },
                { name: "stock", label: "Stock", type: "number", required: true },
                {
                  name: "images",
                  label: "Image URLs (comma-separated)",
                },
                { name: "ratings", label: "Ratings", type: "number" },
                { name: "totalReviews", label: "Total Reviews", type: "number" },
              ].map(({ name, label, type = "text", required }) => (
                <div className="form-group" key={name}>
                  <label>{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    required={required}
                    placeholder={label}
                    min={type === "number" ? "0" : undefined}
                  />
                </div>
              ))}

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={closeForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary btn-admin"
                  disabled={submitting}
                >
                  {submitting
                    ? "Saving..."
                    : mode === "create"
                    ? "Create"
                    : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Product Table ── */}
      {loading ? (
        <Spinner />
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>No products yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Ratings</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.images?.[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="table-img"
                      />
                    ) : (
                      <span className="no-img">—</span>
                    )}
                  </td>
                  <td>{p.title}</td>
                  <td>{p.category || "—"}</td>
                  <td>{p.brand || "—"}</td>
                  <td>₹{p.price}</td>
                  <td>{p.discountPrice ? `₹${p.discountPrice}` : "—"}</td>
                  <td>{p.stock}</td>
                  <td>{p.ratings ?? "—"}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-edit"
                        onClick={() => openEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(p._id)}
                        disabled={deletingId === p._id}
                      >
                        {deletingId === p._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
