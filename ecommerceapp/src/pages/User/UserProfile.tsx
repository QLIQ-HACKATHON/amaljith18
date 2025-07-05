import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="auth-form">
      <h2>User Profile</h2>
      <p>Email: {user?.email}</p>
      <p>Password: {user?.password}</p>
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};
export default UserProfile;
