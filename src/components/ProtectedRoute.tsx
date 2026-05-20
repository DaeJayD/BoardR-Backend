import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: JSX.Element;
  allowedRole?: "student" | "landlord" | "admin";
}

const ProtectedRoute = ({ children, allowedRole }: Props) => {
  const { user, profile, authLoading } = useAuth();

  // ⏳ still loading auth session
  if (authLoading) {
    return (
      <div className="p-6 text-center">
        Loading...
      </div>
    );
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ⏳ wait for profile ONLY if user exists
  // (prevents redirect flicker loops)
  if (user && !profile) {
    return (
      <div className="p-6 text-center">
        Loading profile...
      </div>
    );
  }

  // ❌ role mismatch (only check when profile is ready)
  if (allowedRole && profile?.role && profile.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;