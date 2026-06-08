import React, { useState } from "react";
import axios from "axios";
const App = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    amount: "",
    currency: "INR",
    category: "MEN",
  });

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let res = await axios.post("http://localhost:3000/product", formData);
      console.log(res);
    } catch (error) {
      console.log("error in posting the information", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-sm"
      >
        <fieldset className="space-y-5">
          <legend className="mb-6 text-2xl font-semibold text-gray-900">
            Product details
          </legend>

          <div>
            <label
              htmlFor="productName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Product name
            </label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, productName: e.target.value });
              }}
              id="productName"
              name="productName"
              type="text"
              value={formData.productName}
              required
              placeholder="Enter product name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
              id="description"
              name="description"
              value={formData.description}
              rows="4"
              className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Price amount
              </label>
              <input
                onChange={(e) => {
                  setFormData({ ...formData, amount: e.target.value });
                }}
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                min="0"
                step="0.01"
                required
                placeholder="0.00"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="currency"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Currency
              </label>
              <select
                onChange={(e) => {
                  setFormData({ ...formData, currency: e.target.value });
                }}
                id="currency"
                name="currency"
                required
                value={formData.currency}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
              }}
              id="category"
              name="category"
              value={formData.category}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="MEN">MEN</option>
              <option value="WOMEN">WOMEN</option>
              <option value="KIDS">KIDS</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Create product
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default App;
