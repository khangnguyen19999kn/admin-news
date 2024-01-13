import useAuth from "@/constant/hooks/useAuth";
import LayoutContainer from "@/elements/layoutContainer/LayoutContainer";
import { useManagementDisplayName } from "@/zustands/useManagementDisplayName";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated, isLoading, handleLogout, isAdmin } = useAuth();
  const { displayName } = useManagementDisplayName();

  if (isLoading) return <div></div>;
  return (
    <>
      {isAuthenticated ? (
        <LayoutContainer displayName={displayName} isAdmin={isAdmin} handleLogout={handleLogout}>
          <Outlet />
        </LayoutContainer>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}
