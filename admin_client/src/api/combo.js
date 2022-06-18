import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "https://tuanvq-project.herokuapp.com" });

// COMBO
export const getAllCombo = () => API.get("/combo");
export const createCombo = (combo) => API.post("/combo/new", combo);
export const deleteCombo = (id) => API.delete(`/combo/delete/${id}`);
export const updateCombo = (id, combo) => API.put(`/combo/update/${id}`, combo);
