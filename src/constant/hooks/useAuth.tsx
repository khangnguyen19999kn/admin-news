import { useCheckToken } from "@/services/api/users/useCheckToken";
import { useManagementDisplayName } from "@/zustands/useManagementDisplayName";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const navigate = useNavigate();
  const { mutateAsync: checkToken } = useCheckToken();
  const { setDisplayName } = useManagementDisplayName();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkTokenValidity = useCallback(() => {
    const token = localStorage.getItem("token");
    const willAdmin = true;
    if (!token) {
      setAuthenticated(false);
      setIsLoading(false);
      return;
    }
    checkToken(token)
      .then(res => {
        setDisplayName(res.displayName || "");
        setAuthenticated(true);
        setIsAdmin(willAdmin);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    checkTokenValidity();
    const intervalId = setInterval(checkTokenValidity, 60000);
    return () => clearInterval(intervalId);
  }, []);
  return {
    isAuthenticated,
    isLoading,
    handleLogout,
    isAdmin,
  };
}
