export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.includes("localhost")) {
      return "http://localhost:4000";
    }
  }
  return "https://coinchecker3-2c9pds9s.b4a.run";
};
