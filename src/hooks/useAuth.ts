import { jwtDecode } from "jwt-decode";
import useStore from "../contexts/store";

interface JwtPayload {
  exp?: number;
}

interface JwtPayload {
  exp?: number;
}

const useAuth = () => {
  const setIsPremium = useStore((state) => state.setIsPremium);
  const setSubscriptionId = useStore((state) => state.setSubscriptionId);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);

      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("subscriptionId");
        setIsPremium(false);
        setSubscriptionId(null || "");
        return false;
      }
      return true;
    }
    return false;
  };

  return { checkAuth };
};

export default useAuth;
