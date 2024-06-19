export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname.includes("localhost")) {
      return "http://localhost:4000";
    }
  }
  return "https://coinchecker2-647hrzuj.b4a.run";
};
