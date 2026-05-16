import {
  Navigate
} from "react-router-dom";

import {
  useAuth
} from "../store/AuthContext";

const ProtectedRoute = ({
  children
}: {
  children: React.ReactNode;
}) => {

  const { token } =
    useAuth();

  if (!token) {

    return (
      <Navigate to="/login" />
    );
  }

  return children;
};

export default ProtectedRoute;