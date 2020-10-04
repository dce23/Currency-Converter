import React from "react";

export default function CurrencyInput(props) {
  const { currCurrency, selectCurrency, onChangeCurrency, amount, onChangeAmount } = props;
  return (
    <div>
      <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
      <select className="currency" value={selectCurrency} onChange={onChangeCurrency}>
        {/* Loop thru all currency options */}
        {currCurrency.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
