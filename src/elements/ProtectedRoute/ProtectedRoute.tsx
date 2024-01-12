import useAuth from "@/constant/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();

  if (isAdmin) {
    return <>{children}</>;
  }

  return <Navigate to="/news" />;
}
