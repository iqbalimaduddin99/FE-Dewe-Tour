import { useState } from "react";
import { Card } from "react-bootstrap";
import CardPayment from "./atoms/Payment";

function Payment() {
  const [paymentClick, setPayment] = useState(false)

  const PaymentClick = () => {
    setPayment(true)
  }

  return (
    <div style={{margin:"50px 120px 0px 120px", height:'100vh'}} >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardPayment />
      </div>
      {paymentClick === true ? <div></div> : <div className="book-now">
          <button onClick={PaymentClick} className="book-now-button">
            <p className="font-book-now">Pay</p>
          </button>
        </div>}
        
    </div>
  );
}

export default Payment;
