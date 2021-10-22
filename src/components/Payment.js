import { Card } from "react-bootstrap";
import CardPayment from "../atoms/Payment";

function Payment() {
  return (
    <div style={{margin:"50px 120px 0px 120px"}}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardPayment />
      </div>

        <div className="book-now">
          <button className="book-now-button">
            <p className="font-book-now">Book Now</p>
          </button>
        </div>
    </div>
  );
}

export default Payment;
