const env = "production" as string;

export default env == "development"
  ? "http://localhost:8080"
  : "https://api-77xl.onrender.com";
