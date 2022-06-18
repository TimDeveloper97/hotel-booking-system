import axios from "axios";
import { STRING } from "../constants";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: STRING.SERVER_URL });

export const getDashboard = () => API.get("/dashboard");
