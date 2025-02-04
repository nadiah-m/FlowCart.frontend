import axios from "axios";
//http://localhost:8080/api/v1/orders
const host = "http://flowcart.ndhmlk.site";
const ORDER_SERVICE_URL = host + "/api/v1/orders";
const STOCK_SERVICE_URL = host + "/api/stock";

export const getOrders = () => axios.get(STOCK_SERVICE_URL);

export const createOrder = (order) => axios.post(ORDER_SERVICE_URL, order);

export const getEmployee = (employeeId) =>
  axios.get(REST_API_BASE_URL + "/" + employeeId);

export const updateEmployee = (employeeId, employee) =>
  axios.put(REST_API_BASE_URL + "/" + employeeId, employee);

export const deleteEmployee = (employeeId) =>
  axios.delete(REST_API_BASE_URL + "/" + employeeId);
