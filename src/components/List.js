import { List, Table } from "react-bootstrap";
import CardPayment from "../atoms/Payment";

function Transaction() {
  return (
    <div style={{ margin:'40px 50px 30px', display: "flex", justifyContent: "center" }}>
      <Table striped bordered hover >
        <thead>
          <tr style={{background:'white'}}>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{background:'#ededed '}}>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr style={{background:'white'}}>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Transaction;
