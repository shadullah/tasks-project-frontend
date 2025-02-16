import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user_id = localStorage.getItem("userId");
  if (user_id) return children;
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
