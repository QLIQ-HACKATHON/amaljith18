import { useState, useEffect } from "react";
import useAxiosFetch from "../../custom-hooks/useAxiosFetch";
import "./AdminDashboard.scss";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
}

interface User {
  email: string;
  password: string;
  role: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"users" | "products">("products");
  const [users, setUsers] = useState<User[]>([]);
  const {
    data: productData,
    loading,
    error,
  } = useAxiosFetch<{ products: Product[] }>(
    "https://dummyjson.com/products/category/groceries"
  );

  useEffect(() => {
    const adminUser = sessionStorage.getItem("user");
    const registeredUser = sessionStorage.getItem("registeredUser");
    const usersList: User[] = [];

    if (adminUser) usersList.push(JSON.parse(adminUser));
    if (registeredUser) usersList.push(JSON.parse(registeredUser));

    setUsers(usersList);
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h3>Admin Panel</h3>
        <button
          onClick={() => setActiveTab("users")}
          className={activeTab === "users" ? "active" : ""}
        >
          All Users
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={activeTab === "products" ? "active" : ""}
        >
          All Products
        </button>
      </div>

      <div className="content">
        {activeTab === "users" && (
          <>
            <div className="header-section">
              <h2>All Users</h2>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{user.email}</strong>
                    </td>
                    <td>{user.role}</td>
                    <td>
                      <span className="active-status">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "products" && (
          <>
            <div className="header-section">
              <h2>All Products</h2>
            </div>

            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {productData && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Selling Price</th>
                    <th>In Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {productData.products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <strong>{product.title}</strong>
                      </td>
                      <td>{product.category || "Groceries"}</td>
                      <td>${product.price}</td>
                      <td>
                        {product.stock > 0 ? (
                          <span className="in-stock">✓ In Stock</span>
                        ) : (
                          <span className="out-of-stock">Out of Stock</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
