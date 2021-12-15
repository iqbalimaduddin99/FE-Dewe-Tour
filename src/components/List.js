import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Payment from "./atoms/Payment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { API } from "../config/api";
import { UserContext } from "../context/UserContext";

function Transaction() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [dataList, setDataList] = useState();
  const [state] = useContext(UserContext);

  const getData = async () => {
    const response = await API.get("/orders");
    console.log(response);
    setData(response.data.data);
  };
  const filterData = data?.filter((item) => item.status !== "Waiting payment");
  useEffect(() => {
    getData();
  }, [state.updating]);

  const handlePayment = async (id) => {
    setShow(!show);
    console.log(id);
    const response = await API.get(`/transaction/${id}`);
    console.log(response);
    setDataList(response.data.data);
  };

  return (
    <div
      style={{ minHeight: "100vh", marginRight: "90px", marginLeft: "90px" }}
    >
      <p className="title-bold">Incoming Transaction</p>
      <div
        style={{
          margin: "40px 0px 30px",
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
            {filterData?.map((item, index) => {
              return (
                <>
                  <tr style={{ background: "white" }}>
                    <td>{index + 1}</td>
                    <td>{item.user.fullName}</td>
                    <td>{item.country}</td>
                    <td>{item.attachment}</td>
                    {(() => {
                      if (item.status === "Cancel") {
                        return (
                          <td className="status-list-cancel">{item.status}</td>
                        );
                      } else if (item.status === "Waiting approve") {
                        return <td className="status-list">{item.status}</td>;
                      } else if (item.status === "Approve") {
                        return (
                          <td className="status-list-approve">{item.status}</td>
                        );
                      } else {
                        return <td className="status-list-approve"></td>;
                      }
                    })()}

                    {(() => {
                      if (item.status === "Cancel") {
                        return (
                          <td
                            onClick={() => {
                              handlePayment(item.id);
                            }}
                          >
                            <FontAwesomeIcon
                              style={{
                                color: "red",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              icon={faTimesCircle}
                            />
                          </td>
                        );
                      } else if (item.status === "Approve") {
                        return (
                          <td
                            onClick={() => {
                              handlePayment(item.id);
                            }}
                          >
                            <FontAwesomeIcon
                              style={{
                                color: "green",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              icon={faCheckCircle}
                            />
                          </td>
                        );
                      } else {
                        return (
                          <td
                            onClick={() => {
                              handlePayment(item.id);
                            }}
                          >
                            <FontAwesomeIcon
                              style={{
                                color: " #2FC5F7",
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              icon={faSearch}
                            />
                          </td>
                        );
                      }
                    })()}
                  </tr>
                </>
              );
            })}

            <Payment data={dataList} show={show} setShow={setShow} />
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Transaction;
