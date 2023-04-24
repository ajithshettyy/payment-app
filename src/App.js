import React, { useState } from "react";
import Cleave from "cleave.js/react";

import "animate.css";
import "./App.css";

let cardImages = {
  visa: "https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png",
  mastercard:
    "https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_rev_92px_2x.png",
  discover:
    "https://www.discover.com/company/images/newsroom/media-downloads/discover.png",
  amex: "https://s1.q4cdn.com/692158879/files/design/svg/american-express-logo.svg",
  diners:
    "https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/diners_club-512.png",
  jcb: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1280px-JCB_logo.svg.png",
};

const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  const [creditCardNum, setCreditCardNum] = useState("#### #### #### ####");
  const [cardType, setCardType] = useState("");
  const [cardHolder, setCardHolder] = useState("Your Full Name");
  const [expireMonth, setExpireMonth] = useState("MM");
  const [expireYear, setExpireYear] = useState("YYYY");
  const [cardTypeUrl, setCardTypeUrl] = useState(
    "https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png"
  );

  const handleNum = (e) => {
    setCreditCardNum(e.target.rawValue);
  };

  const handleType = (type) => {
    setCardType(type);

    if (cardImages[type]) {
      setCardTypeUrl(cardImages[type]);
    }
  };

  const handleCardHolder = (e) => {
    setCardHolder(e.target.value);
  };

  const handleExpMonth = (e) => {
    setExpireMonth(e.target.value);
  };

  const handleExpYear = (e) => {
    setExpireYear(e.target.value);
  };

  return (
    <div className="container">
      <form id="form">
        <div id="card">
          <div className="header">
            <div className="sticker"></div>
            <div>
              <img className="logo" src={cardTypeUrl} alt="Card logo" />
            </div>
          </div>
          <div className="body">
            <h2 id="creditCardNumber">{creditCardNum}</h2>
          </div>
          <div className="footer">
            <div>
              <h5>Card Holder</h5>
              <h3>{cardHolder}</h3>
            </div>
            <div>
              <h5>Expires</h5>
              <h3>
                {expireMonth} / {expireYear}
              </h3>
            </div>
          </div>
        </div>

        <div className="input-container mt">
          <h4>Enter card number</h4>
          <Cleave
            delimiter="-"
            options={{
              creditCard: true,
              onCreditCardTypeChanged: handleType,
            }}
            onChange={handleNum}
            placeholder="Please enter your credit card number"
          />
        </div>

        <div className="input-container">
          <h4>Card Holder</h4>
          <input
            onChange={handleCardHolder}
            type="text"
            placeholder="Please enter your full name"
            required
          />
        </div>

        <div className="input-grp">
          <div className="input-container">
            <h4>Expiration Year</h4>
            <select value={expireYear} onChange={handleExpYear}>
              {months.map((month) => (
                <option value={month}>{month}</option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <h4>Month</h4>
            <select value={expireMonth} onChange={handleExpMonth}>
              {years.map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <h4>CVV</h4>
            <input type="password" placeholder="CVV" required />
          </div>
        </div>

        <button>{`Submit ${cardType} payment`}</button>
      </form>
    </div>
  );
}

export default App;
