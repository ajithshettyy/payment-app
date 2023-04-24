import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { ThreeDots } from "react-loader-spinner";

import { payment } from "../../services/payment";
import Config from "../../Config";

function Payment() {
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    amount: 1,
    email: "",
  });

  const makePayment = async (e) => {
    setPaymentInProgress(true);
    e.preventDefault();
    const stripe = await loadStripe(Config.publishableKey);
    const session = await payment(product);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    setPaymentInProgress(false);
    if (result.error) {
      console.log(result.error);
    }
  };

  const setValue = async (e) => {
    setProduct({ [e.target.name]: e.target.value, ...product });
  };

  return (
    <form id="form">
      <div className="input-container mt">
        <h4>Name</h4>
        <input
          type="text"
          name="name"
          placeholder="Please enter your full name"
          onChange={setValue}
          required
        />
      </div>

      <div className="input-container">
        <h4>Email</h4>
        <input
          type="text"
          name="email"
          placeholder="Please enter your email"
          onChange={setValue}
          required
        />
      </div>

      <div className="input-grp">
        <div className="input-container">
          <h4>Amount</h4>
          <input
            type="number"
            name="amount"
            min={1}
            max={100000}
            placeholder="Amount"
            required
            onChange={setValue}
          />
        </div>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={paymentInProgress}
        />
      </div>

      <button
        onClick={makePayment}
        disabled={paymentInProgress}
      >{`Make payment`}</button>
    </form>
  );
}

export default Payment;
