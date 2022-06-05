import axios from "axios";
axios.defaults.withCredentials = true;
const API = axios.create({ baseURL: "http://localhost:5000" });

export const createBooking = (booking) => API.post("/booking/new", booking);
export const getAllBookingByUser = () => API.get(`/booking/list`);
export const cancelBooking = (bookingId) =>
  API.get(`/booking/cancel/${bookingId}`);
export const createPaymentUrl = (data) =>
  API.post("/booking/create-payment-url", data);
export const checkPaymentReturn = (data) =>
  API.post("/booking/check-payment-return", data);
