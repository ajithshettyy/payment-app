import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { loadStripe } from "@stripe/stripe-js";

import { payment } from "../../services/payment";

function Payment() {
  const [product, setProduct] = useState({
    name: "Go FullStack with KnowledgeHut",
    price: 1000,
    productOwner: "KnowledgeHut",
    description:
      "This beginner-friendly Full-Stack Web Development Course is offered online in blended learning mode, and also in an on-demand self-paced format.",
    quantity: 1,
  });

  const makePayment = async (e) => {
    alert("Making payment");
    e.preventDefault();
    const stripe = await loadStripe(
      "pk_test_51N0TySSGrtE5FEeYuncrnkycGyRkdcPaV3ccVp1RviKnjAFRBj0X0dCWAKgbLAaXTN2OEmeChvZ9ej1SJoN99s8o00KaTHG20d"
    );
    const response = await payment(product);
    console.log(response);
    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Img
        variant="top"
        src="https://images.pexels.com/photos/12428359/pexels-photo-12428359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button variant="primary" onClick={makePayment}>
          Buy Now for {product.price}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Payment;
