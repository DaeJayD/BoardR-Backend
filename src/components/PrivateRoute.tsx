import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const PrivateRoute = ({
  children,
  role,
}: {
  children: JSX.Element;
  role?: "student" | "landlord" | "admin";
}) => {
  const { user, profile, loading } = useAuth();

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (role && profile?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};