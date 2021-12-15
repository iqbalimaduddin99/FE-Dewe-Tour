import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useLocation, useParams } from "react-router";
import { API } from "../config/api";
import CardPayment from "./atoms/Payment";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Payment() {
  const { id } = useParams();
  const [paymentClick, setPayment] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [state, dispatch] = useContext(UserContext);
  const [input, setInput] = useState({
    attachment: null,
  });
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [datas, setDatas] = useState();

  useEffect(async () => {
    if (location.pathname === `/payment/${id}`) {
      const response = await API.get(`/transaction/${id}`);
      setData(response.data.data);
    }
  }, [state.updating]);

  useEffect(async () => {
    if (location.pathname === `/payment`) {
      const response = await API.get(`/transaction`);
      setDatas(response.data.data);
    }
  }, [state.updating]);

  const onHideModal = () => setShow(false);

  const ClickHere = () => {
    setShow(false);
    history.push("/payment");
    dispatch({
      type: "update",
    });
    setPayment(false)
  };
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const PaymentClick = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const formData = new FormData();
      if (input.attachment !== null) {
        formData.set("image", input.attachment[0]);
        formData.set("status", "Waiting approve");
      } else {
        formData.set("status", "Waiting payment")
      }
      

      const response = await API.patch(`transaction/${id}`, formData, config);
      console.log(response);
      setPayment(true);
      dispatch({
        type: "update",
      });
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: "50px 160px 0px 160px", minHeight: "100vh" }}>
      {(() => {
        if (data === null) {
          return (
            <div>
              <div class="tabs">
                <input
                  // onClick={waitingPayment}
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab1"
                  defaultChecked
                />
                <label for="tab1" className="tabs__label">
                  Waiting Payment
                </label>
                <input
                  // onClick={waitingApprove}
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab2"
                />
                <label for="tab2" className="tabs__label">
                  Waiting Approve
                </label>
                <input
                  // onClick={approved}
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab3"
                />
                <label for="tab3" className="tabs__label">
                  Approve
                </label>
                <input
                  // onClick={cancel}
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab4"
                />
                <label for="tab4" className="tabs__label">
                  Cancel
                </label>
              </div>
              <div className="null-payment">
                You don't have a transaction, please order
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <CardPayment
                id={id}
                handleChange={handleChange}
                preview={preview}
                data={data}
                datas={datas}
                setPayment={setPayment}
              />

              {paymentClick === true ? (
                show && (
                  <div>
                    <div className="overlay" onClick={onHideModal} />
                    <div className="modal-alert">
                      <p>
                        Your payment will be confirmed within 1 x 24 hours To
                        see orders click
                        <span
                          onClick={ClickHere}
                          style={{ fontWeight: "bold", cursor: "pointer" }}
                        >
                          {" "}
                          Here
                        </span>{" "}
                        thank you
                      </p>
                    </div>
                  </div>
                )
              ) : (
                <div className="pay-book">
                  {(() => {
                    if (location.pathname !== "/payment") {
                      return (
                        <button
                          onClick={PaymentClick}
                          className="book-now-button"
                        >
                          <p className="font-book-now">Pay</p>
                        </button>
                      );
                    }
                  })()}
                </div>
              )}
            </div>
          );
        }
      })()}
    </div>
  );
}

export default Payment;
