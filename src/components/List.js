import { useState } from "react";
import { List, Table } from "react-bootstrap";
import CardPayment from "./atoms/Payment";
import Payment from "./atoms/Payment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Transaction() {
  const [show, setShow] = useState(false);

  const handlePayment = () => {
    setShow(!show);
  };
  return (
    <div style={{ height: "100vh" }}>
      <p className="title-bold">Incoming Transaction</p>
      <div
        style={{
          margin: "40px 50px 30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Table>
          <thead>
            <tr style={{ background: "white" }}>
              <th>No</th>
              <th>Users</th>
              <th>Trip</th>
              <th> Transfer Proof </th>
              <th>Status Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="list">
              <td>1</td>
              <td>Mark</td>
              <td>Japan</td>
              <td>bca.jpg</td>
              <td>waiting</td>
              <td onClick={handlePayment}>
                <FontAwesomeIcon style={{color:' #2FC5F7', fontSize:'20px', cursor:'pointer'}} icon={faSearch} />
              </td>
            </tr>
            <tr style={{ background: "white" }}>
              <td>2</td>
              <td>Mark</td>
              <td>Japan</td>
              <td>bca.jpg</td>
              <td>waiting</td>
              <td onClick={handlePayment}>
                <FontAwesomeIcon style={{color:' #2FC5F7', fontSize:'20px', cursor:'pointer'}} icon={faSearch} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <Payment show={show} setShow={setShow} />
    </div>
  );
}

export default Transaction;
