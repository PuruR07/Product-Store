import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  /* ---------- helpers ---------- */
  setProducts: (products) => set({ products }),

  /* ---------- create ---------- */
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all fields." };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();                // ← backend must send { data: product }

    if (!data?.data?._id) {
      console.error("createProduct: backend returned malformed payload", data);
      return { success: false, message: "Backend error" };
    }

    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully." };
  },

  /* ---------- fetch ---------- */
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();              // ← expects { products: [...] }

      const clean = Array.isArray(data.products)
        ? data.products.filter((p) => p && p._id) // strip null / undefined
        : [];

      set({ products: clean });
    } catch (err) {
      console.error("fetchProducts:", err.message);
    }
  },

  /* ---------- delete ---------- */
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    }));
    return { success: true, message: data.message };
  },

  /* ---------- update ---------- */
  updateProduct: async (id, updated) => {
    if (!updated.name || !updated.price || !updated.image) {
    return { success: false, message: "Please fill all fields: name, price, and image." };
  }
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    const data = await res.json();                // ← backend should send { data: updatedProduct }
    
    if (!data?.product?._id) {
      console.error("updateProduct: backend returned malformed payload", data);
      return { success: false, message: "Backend error" };
    }

    set((state) => ({
      products: state.products.map((p) =>
        p._id === id ? data.product : p
      ),
    }));
    return { success: true, message: data.message };
  },
}));
