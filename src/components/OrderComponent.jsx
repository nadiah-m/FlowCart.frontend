import React, { useState, useEffect } from "react";
import { getEmployee, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "../services/EmployeeService";

const OrderComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");

  const { id } = useParams();
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    qty: "",
  });

  const navigator = useNavigate();

  let messagePostSubmit = "test";

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setName(response.data.name);
          setPrice(response.data.price);
          setQty(response.data.qty);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateOrder(e) {
    e.preventDefault();

    if (validateForm()) {
      const order = { name, price, qty };
      console.log(order);

      // if (id) {
      //   updateEmployee(id, employee)
      //     .then((response) => {
      //       console.log(response.data);
      //       navigator("/employees");
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });
      // } else {
      createOrder(order)
        .then((response) => {
          console.log(response.data);
          navigator("/stock");
        })
        .catch((error) => {
          console.error(error);
        });
      //}
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "Product Name is required";
      valid = false;
    }

    if (price.trim()) {
      errorsCopy.price = "";
    } else {
      errorsCopy.price = "Price is required";
      valid = false;
    }

    if (qty.trim()) {
      errorsCopy.qty = "";
    } else {
      errorsCopy.qty = "Quantity is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Order Service</h2>;
    }
  }
  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Product Name:</label>
                <input
                  type="text"
                  placeholder=""
                  name="name"
                  value={name}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                {errors.name && (
                  <div className="invalid-feedback"> {errors.name} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Price:</label>
                <input
                  type="text"
                  placeholder=""
                  name="price"
                  value={price}
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
                {errors.price && (
                  <div className="invalid-feedback"> {errors.price} </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Quantity:</label>
                <input
                  type="text"
                  placeholder=""
                  name="qty"
                  value={qty}
                  className={`form-control ${errors.qty ? "is-invalid" : ""}`}
                  onChange={(e) => setQty(e.target.value)}
                ></input>
                {errors.qty && (
                  <div className="invalid-feedback"> {errors.qty} </div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveOrUpdateOrder}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
