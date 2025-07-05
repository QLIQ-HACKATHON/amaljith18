import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.scss";

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("registeredUser", JSON.stringify(userData));
    toast.success("Account created successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000); // Delay to let toast show
  };

  return (
    <div className="auth-form">
      <h2>
        <span className="green">User</span> Sign Up
      </h2>
      <form onSubmit={handleSignup}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>click here</span>
        </p>
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
