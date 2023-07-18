import {env} from '$env/dynamic/public'
console.log(env)
export const BACKEND_URL = env.PUBLIC_API_URL || "http://localhost:8080";
export const BACKEND_URL_CLIENT = env.PUBLIC_HOST_URL || "http://localhost:8080";