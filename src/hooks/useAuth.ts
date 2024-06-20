import { jwtDecode } from "jwt-decode";
import useStore from "../contexts/store";

interface JwtPayload {
  exp?: number;
  email?: string;
  isPremium?: boolean;
  subscriptionId?: string;
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
      setIsPremium(decoded.isPremium || false);
      setSubscriptionId(decoded.subscriptionId || null);
      return true;
    }
    return false;
  };

  const getUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded;
    }
    return null;
  };

  return { checkAuth, getUser };
};

export default useAuth;
