import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.scss";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email.trim(), password.trim());

    if (success) {
      toast.success("Login successful!");
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/");
        } else {
          navigate("/");
        }
      }, 1000);
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="auth-form">
      <h2>
        <span className="green">User</span> Login
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p>
          Create an account?{" "}
          <span onClick={() => navigate("/signup")}>click here</span>
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
