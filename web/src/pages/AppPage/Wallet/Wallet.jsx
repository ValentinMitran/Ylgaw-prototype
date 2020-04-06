import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from "./CardForm";
import "./Wallet.scss";

const stripePromise = loadStripe("pk_test_bpOsvYFxdzalr4Pk4TKbLh0s00mkqCEhEh");

function Wallet(props) {
  const [topUp, setTopUp] = useState(5);
  const [update, setUpdate] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdate(!update);
  };

  if (!update) {
    return (
      <>
        <div className={props.isSidebarOpen ? "main" : "mainSideClosed"}>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={topUp}
              onChange={(e) => setTopUp(e.target.value)}
              min="5"
              max="999"
            />
            <button type="submit">Top Up</button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="CardSection">
        <Elements stripe={stripePromise}>
          <CardForm amount={topUp} />
        </Elements>
      </div>
    </>
  );
}

export default Wallet;
