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
    alert(JSON.stringify(product));
    const session = await payment(product);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    setPaymentInProgress(false);
    if (result.error) {
      console.log(result.error);
    }
  };

  const setValue = async (fieldname, e) => {
    setProduct({ ...product, [fieldname]: e.target.value });
  };

  return (
    <form id="form">
      <div className="input-container mt">
        <h4>Name</h4>
        <input
          type="text"
          placeholder="Please enter your full name"
          onChange={(e) => setValue("name", e)}
          required
        />
      </div>

      <div className="input-container">
        <h4>Email</h4>
        <input
          type="text"
          placeholder="Please enter your email"
          onChange={(e) => setValue("email", e)}
          required
        />
      </div>

      <div className="input-grp">
        <div className="input-container">
          <h4>Amount</h4>
          <input
            type="number"
            min={1}
            max={100000}
            placeholder="Amount"
            required
            onChange={(e) => setValue("amount", e)}
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
