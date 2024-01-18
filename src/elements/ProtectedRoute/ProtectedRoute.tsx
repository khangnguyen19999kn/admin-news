import { useManagementDisplayName } from "@/zustands/useManagementDisplayName";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useManagementDisplayName();

  if (isAdmin) {
    return <>{children}</>;
  }

  return <Navigate to="/news" />;
}
