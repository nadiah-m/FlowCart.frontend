import React, { useEffect, useState } from "react";
import { deleteEmployee, getOrders } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const StockComponent = () => {
  const [orders, setOrders] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllOrders();
  }, []);

  function getAllOrders() {
    getOrders()
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function addOrder() {
    navigator("/order");
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    console.log(id);

    deleteEmployee(id)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">Stock Service</h2>
      <button className="btn btn-primary mb-2" onClick={addOrder}>
        Place order
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.name}</td>
              <td>{order.price}</td>
              <td>{order.qty}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(order.orderId)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeEmployee(order.orderId)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockComponent;
