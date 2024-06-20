export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.includes("localhost")) {
      return "https://coinchecker3-2c9pds9s.b4a.run";
    }
  }
  return "https://coinchecker3-2c9pds9s.b4a.run";
};
