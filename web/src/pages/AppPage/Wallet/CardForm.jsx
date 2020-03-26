import React, { useMemo, useState, useEffect, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { BalanceContext } from "../../../utils/BalanceContext";
import useResponsiveFontSize from "./utils/useResponsiveFontSize";
const jwt = require("jsonwebtoken");

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const CardForm = props => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [decodedjwt, setDecodedjwt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useContext(BalanceContext);

  function decodejwt() {
    const decodedjwt = jwt.decode(localStorage.authToken);
    setDecodedjwt(decodedjwt);
    setLoading(false);
  }

  useEffect(() => {
    decodejwt();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    let response = await fetch("/api/wallet/topup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: localStorage.authToken
      },
      body: JSON.stringify({
        amount: props.amount
      })
    }).catch(err => {
      alert(err);
    });
    response = await response.json();
    stripe
      .confirmCardPayment(response.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: decodedjwt.name
          }
        }
      })
      .then(async function(result) {
        if (result.error) {
          alert(result.error.message);
        }
        alert(result.paymentIntent.status);
        if (result.paymentIntent.status === "succeeded") {
          console.log("PAYED");

          await fetch("/api/wallet/topup/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authToken: localStorage.authToken
            },
            body: JSON.stringify({
              amount: props.amount
            })
          }).catch(err => {
            alert(err);
          });

          setBalance(Number(balance) + Number(props.amount));
        }
      });
  };

  if (loading) {
    return <>Loading...</>;
  }
  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardElement
            options={options}
            onReady={() => {
              console.log("CardElement [ready]");
            }}
            onChange={event => {
              console.log("CardElement [change]", event);
            }}
            onBlur={() => {
              console.log("CardElement [blur]");
            }}
            onFocus={() => {
              console.log("CardElement [focus]");
            }}
          />
        </label>
        <button type="submit" disabled={!stripe}>
          Top Up {props.amount}&euro;
        </button>
      </form>
    </div>
  );
};
export default CardForm;