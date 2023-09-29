import { e as env } from "./env-public.js";
const BACKEND_URL = env.PUBLIC_API_URL || "http://localhost:8080";
env.PUBLIC_HOST_URL || "http://localhost:8080";
export {
  BACKEND_URL as B
};
