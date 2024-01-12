import useAuth from "@/constant/hooks/useAuth";
import LayoutContainer from "@/elements/layoutContainer/LayoutContainer";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated, isLoading, handleLogout, isAdmin } = useAuth();

  if (isLoading) return <div></div>;
  return (
    <>
      {isAuthenticated ? (
        <LayoutContainer displayName="Khang Nguyễn" isAdmin={isAdmin} handleLogout={handleLogout}>
          <Outlet />
        </LayoutContainer>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
}
