import React, { useState, createContext, useEffect } from "react";

export const BalanceContext = createContext();

export const BalanceProvider = props => {
  const [balance, setBalance] = useState(0);

  async function getBalance() {
    let response = await fetch("/api/wallet/balance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.authToken
      }
    }).catch(err => {
      alert(err);
    });
    response = await response.json();
    setBalance(response.balance / 100);
  }

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <BalanceContext.Provider value={[balance, setBalance]}>
      {props.children}
    </BalanceContext.Provider>
  );
};