import React, { useContext } from "react";
import Navbar from "../Components/Navbar";
import "./Forms.css";
import { useState, useEffect } from "react";

function Spending() {
  // Defining the state variables
  const [payment, setPayment] = useState({
    description: "",
    amount: "",
  });
  const [paymentHistory, setPaymentHistory] = useState(
    JSON.parse(localStorage.getItem("paymentHistory")) || []
  );
  const [spending, setSpending] = useState("");

  //Updating the form data
  const updateForm = (e) => {
    setPayment({
      ...payment,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    });
  };

  //Calculating the total spending
  const getSpending = () => {
    const amounts = paymentHistory.map((i) => i.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    setSpending(total);
  };

  //Updating the spending and payment history in the locat storage
  useEffect(() => {
    getSpending();
    localStorage.setItem("paymentHistory", JSON.stringify(paymentHistory));
  }, [paymentHistory]);

  //Clearing the payment history
  const clearSpending = () => {
    setPaymentHistory([]);
  };

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="container layout">
        <div className="form">
          <h2>How much you have spent:</h2>
          <h3>£{spending}</h3>
        </div>
        <div className="form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPaymentHistory([payment, ...paymentHistory]);
              setPayment({ description: "", amount: "" });
            }}
          >
            <div className="form-input">
              <div className="input-title">
                <h3>Description:</h3>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter details"
                  value={payment.description}
                  name="description"
                  onChange={updateForm}
                />
              </div>
            </div>
            <div className="form-input">
              <div className="input-title">
                <h3>Amount:</h3>
              </div>
              <div className="input-field">
                <input
                  type="number"
                  className="input"
                  placeholder="Enter sum"
                  name="amount"
                  value={payment.amount}
                  onChange={updateForm}
                />
              </div>
            </div>
            <div className="form-input">
              <div className="input-title"></div>
              <div className="input-field">
                <button type="submit" className="button is-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div>
            <button className="clear-budget" onClick={clearSpending}>
              Clear Spendings
            </button>
            <h2 className="subtitle">History</h2>
            {paymentHistory.map((i) => {
              return (
                <table className="table">
                  <tbody key={i.description}>
                    <tr>{i.description}</tr>
                    <td>£{parseInt(i.amount)}</td>
                  </tbody>
                </table>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Spending;
