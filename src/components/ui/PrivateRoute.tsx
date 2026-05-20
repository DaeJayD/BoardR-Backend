import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
  role?: "customer" | "landlord"; // optional role restriction
}

export const PrivateRoute = ({ children, role }: PrivateRouteProps) => {
  const { user, profile, loading } = useAuthContext();

  if (loading) {
    return <p>Loading...</p>; // replace with spinner if you like
  }

  if (!user) {
    // not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (role && profile?.role !== role) {
    // logged in but wrong role → redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};
