import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyInput from "./CurrencyInput";

const URL = "https://api.exchangeratesapi.io/latest";

function App() {
  // Set current currency and then set it to currency option
  const [currCurrency, setCurrencyOption] = useState([]);
  //console.log(currCurrency);

  const [firstCurrency, setCurrency] = useState();
  const [secondCurrency, setTheCurrency] = useState();

  const [amount, setAmount] = useState(1);
  const [amountInFirstCurrency, setTheAmount] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  //console.log(exchangeRate);

  let firstAmount, secondAmount;
  if (amountInFirstCurrency) {
    secondAmount = amount;
    firstAmount = amount * exchangeRate;
  } else {
    firstAmount = amount;
    secondAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      //.then((data) => console.log(data));
      .then((data) => {
        const currency = Object.keys(data.rates)[0];
        setCurrencyOption([data.base, ...Object.keys(data.rates)]);
        setCurrency(data.base);
        setTheCurrency(currency);
        setExchangeRate(data.rates[currency]);
      });
  }, []);

  useEffect(() => {
    if (firstCurrency != null && secondCurrency != null) {
      fetch(`${URL}?base=${firstCurrency}&symbols=${secondCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[secondCurrency]));
    }
  }, [firstCurrency, secondCurrency]);

  function handleFirstAmountChange(e) {
    setAmount(e.target.value);
    setTheAmount(true);
  }

  function handleSecondAmountChange(e) {
    setAmount(e.target.value);
    setTheAmount(false);
  }

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <CurrencyInput
        // Pass Currency Input Options as a prop
        currCurrency={currCurrency}
        selectCurrency={firstCurrency}
        onChangeCurrency={(e) => setCurrency(e.target.value)}
        onChangeAmount={handleFirstAmountChange}
        amount={secondAmount}
      />
      <div className="equals">=</div>
      <CurrencyInput
        // Pass Currency Input Options as a prop
        currCurrency={currCurrency}
        selectCurrency={secondCurrency}
        onChangeCurrency={(e) => setTheCurrency(e.target.value)}
        onChangeAmount={handleSecondAmountChange}
        amount={firstAmount}
      />
    </div>
  );
}

export default App;
