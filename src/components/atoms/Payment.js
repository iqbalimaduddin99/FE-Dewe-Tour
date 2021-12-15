import { Card, Row, Col, Alert } from "react-bootstrap";
import Icon from "../../assets/IconBlack.png";
import bill from "../../assets/bill.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useLocation, useHistory } from "react-router";
import QRCode from "../../assets/Group.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { API } from "../../config/api";
import moment from "moment";

function Payment({
  show,
  setShow,
  preview,
  handleChange,
  data,
  datas,
  setPayment,
}) {
  const [state, dispatch] = useContext(UserContext);
  const [updateData, setUpdateData] = useState();
  const [approve, setApprove] = useState();
  const [showQuota, setShowQuota] = useState(false);
  const location = useLocation();
  console.log(datas);
  console.log(data);
  const path = "http://localhost:5000/uploads/";
  const onHideModal = () => setShowQuota(false);

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const updateAttachment = (updatingData) => {
    history.push(`/payment/${updatingData?.id}`);
    dispatch({
      type: "update",
    });
    if (location.pathname !== "/profile") {
      setPayment(false);
    }
  };

  const adminHandleApprove = async () => {
    try {
      if (data?.counterQty + data?.trip.counterQty > data?.trip.quota) {
        setShowQuota(true);
      } else {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const body = { status: "Approve" };
        const response = await API.patch(
          `transaction/${data?.id}`,
          body,
          config
        );
        console.log(response);
        dispatch({
          type: "update",
        });
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const adminHandleCancel = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = { status: "Cancel" };
      const response = await API.patch(`transaction/${data?.id}`, body, config);
      console.log(response);
      dispatch({
        type: "update",
      });
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  const waitingPayment = () => {
    const WaitingPayment = datas?.filter(
      (item) => item.status === "Waiting payment"
    );
    setUpdateData(WaitingPayment);
  };
  const waitingApprove = () => {
    const WaitingApprove = datas?.filter(
      (item) => item.status === "Waiting approve"
    );
    setUpdateData(WaitingApprove);
  };
  const approved = () => {
    const Approved = datas?.filter((item) => item.status === "Approve");
    setUpdateData(Approved);
  };
  const cancel = () => {
    const Cancel = datas?.filter((item) => item.status === "Cancel");
    setUpdateData(Cancel);
  };
  const onHideLogin = () => setShow(!show);

  const history = useHistory();

  return (
    <div>
      {(() => {
        if (
          state.user.data.fullName !== "admin" &&
          location.pathname === "/payment"
        ) {
          return (
            <div>
              <div class="tabs">
                <input
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab1"
                  onClick={waitingPayment}
                  defaultChecked
                />
                <label for="tab1" className="tabs__label">
                  Waiting Payment
                </label>
                <input
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab2"
                />
                <label
                  onClick={waitingApprove}
                  for="tab2"
                  className="tabs__label"
                >
                  Waiting Approve
                </label>
                <input
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab3"
                />
                <label onClick={approved} for="tab3" className="tabs__label">
                  Approve
                </label>
                <input
                  onClick={cancel}
                  type="radio"
                  className="tabs__radio"
                  name="tabs-example"
                  id="tab4"
                />
                <label for="tab4" className="tabs__label">
                  Cancel
                </label>
              </div>
              {updateData?.length === 0 ? (
                <div className="null-payment"> Transaction not found </div>
              ) : (
                updateData?.map((updateData) => {
                  return (
                    <div>
                      {updateData?.status === "Waiting payment" ? (
                        <Card
                          onClick={() => {
                            updateAttachment(updateData);
                          }}
                          className="payment-card-content-waiting"
                        >
                          <div style={{ margin: "0px 90px 0px 50px" }}>
                            <nav className="nav-header">
                              <section className="icon-payment">
                                <img alt="" src={Icon} />
                              </section>
                              <section className="booking-payment">
                                <p className="booking-text">Booking</p>
                                <p
                                  style={{
                                    marginTop: "-15px",
                                    marginBottom: "-15px",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <p className="dates-text">
                                    <span className="date-text">Day, </span>23
                                    Oktonber
                                  </p>
                                </p>
                              </section>
                            </nav>
                            <Row>
                              <Col lg={10}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <div>
                                    <p className="payment-title">
                                      {updateData?.trip?.title}
                                    </p>
                                    <p className="small-text">
                                      {updateData?.trip?.country?.name}
                                    </p>
                                    {(() => {
                                      if (
                                        updateData?.status === "Waiting approve"
                                      ) {
                                        return (
                                          <p className="status-payment">
                                            {updateData?.status}
                                          </p>
                                        );
                                      } else if (
                                        updateData?.status === "Approve"
                                      ) {
                                        return (
                                          <p className="status-payment-approve">
                                            {updateData?.status}
                                          </p>
                                        );
                                      } else {
                                        return (
                                          <p className="status-payment-cancel">
                                            {updateData?.status}
                                          </p>
                                        );
                                      }
                                    })()}
                                  </div>
                                  <div>
                                    <div>
                                      <p className="payment-text-bold">date</p>
                                      <p className="small-text-petite">
                                        {moment(
                                          updateData?.trip?.dateTrip
                                        ).format("DD MMMM YYYY")}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="payment-text-bold">
                                        accomodation
                                      </p>{" "}
                                      <p className="small-text-petite">
                                        {updateData?.trip?.accomodation}
                                      </p>
                                    </div>
                                  </div>{" "}
                                  <div>
                                    <div>
                                      {" "}
                                      <p className="payment-text-bold">
                                        Duration
                                      </p>{" "}
                                      <p className="small-text-petite">{`${updateData?.trip?.day} Day, ${updateData?.trip?.night} Night `}</p>
                                    </div>
                                    <p className="payment-text-bold">
                                      Transportation
                                    </p>{" "}
                                    <p className="small-text-petite">
                                      {updateData?.trip?.transportation}
                                    </p>
                                  </div>{" "}
                                </div>
                              </Col>
                              <Col lg={2}>
                                <Row>
                                  {updateData?.attachment === null ? (
                                    <label htmlFor="formFileLg">
                                      {/* {preview ? (
                                        <img
                                          style={{ marginTop: "20px" }}
                                          src={preview}
                                          alt="receipt"
                                        />
                                      ) : ( */}
                                      <div
                                        className="d-flex flex-column mt-4 justify-content-center align-items-center"
                                        style={{
                                          backgroundColor:
                                            "rgba(224, 200, 200, 25%)",
                                          color: "rgba(50,50,50,60%)",
                                          border: "2px solid",
                                          cursor: "pointer",
                                          width: "10rem",
                                          height: "9rem",
                                          borderRadius: "5px",
                                        }}
                                      >
                                        <FontAwesomeIcon
                                          style={{ fontSize: "40px" }}
                                          icon={faFileInvoice}
                                        />
                                        <div>Attacment is empty</div>
                                      </div>
                                      {/* )} */}
                                      <input
                                        id="formFileLg"
                                        type="file"
                                        hidden
                                        name="attachment"
                                        onChange={handleChange}
                                        accept=".jpg,.jpeg,.png,.svg"
                                        required
                                      />
                                    </label>
                                  ) : (
                                    <img
                                      style={{ marginTop: "20px" }}
                                      src={path + updateData?.attachment}
                                      alt="receipt"
                                    />
                                  )}

                                  <p className="small-text-petiter">
                                    upload payment proof
                                  </p>
                                </Row>
                              </Col>
                            </Row>
                            <div style={{ marginTop: "45px" }}>
                              <div style={{ display: "flex" }}>
                                <p
                                  style={{ width: "60px" }}
                                  className="bold-text"
                                >
                                  No
                                </p>
                                <p
                                  style={{ width: "190px" }}
                                  className="bold-text"
                                >
                                  fullname
                                </p>
                                <p
                                  style={{ width: "190px" }}
                                  className="bold-text"
                                >
                                  gender
                                </p>
                                <p
                                  style={{ width: "190px" }}
                                  className="bold-text"
                                >
                                  phone
                                </p>
                              </div>

                              <hr
                                style={{
                                  marginBottom: "13px",
                                  marginTop: "-3px",
                                  border: "2px solid #858585",
                                }}
                              />
                              <Row>
                                {" "}
                                <Col lg={9}>
                                  {" "}
                                  <div style={{ display: "flex" }}>
                                    <p
                                      style={{ width: "60px" }}
                                      className="petite-text"
                                    >
                                      1
                                    </p>
                                    <p
                                      style={{ width: "190px" }}
                                      className="petite-text"
                                    >
                                      {state.user.data.fullName}
                                    </p>
                                    <p
                                      style={{ width: "190px" }}
                                      className="petite-text"
                                    >
                                      {state.user.data.gender}
                                    </p>
                                    <p
                                      style={{ width: "`100px" }}
                                      className="petite-text"
                                    >
                                      {state.user.data.phone}
                                    </p>
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <p className="bold-text-total">
                                    <span className="right-petite">Qty</span>
                                    <span className="center-petite">:</span>
                                    <span>{updateData?.counterQty}</span>
                                  </p>
                                </Col>
                              </Row>

                              <hr
                                style={{
                                  marginTop: "-3px",
                                  border: "2px solid #858585",
                                }}
                              />

                              <Row>
                                <Col lg={9}></Col>
                                <Col lg={3}>
                                  <p className="bold-text-total">
                                    <span className="right-petite">Total</span>
                                    <span className="center-petite">:</span>

                                    <span className="red-text">
                                      {formatter.format(updateData?.total)}
                                    </span>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        <Card className="payment-card-content">
                          <div style={{ margin: "0px 90px 0px 50px" }}>
                            <nav className="nav-header">
                              <section className="icon-payment">
                                <img alt="" src={Icon} />
                              </section>
                              <section className="booking-payment">
                                <p className="booking-text">Booking</p>
                                <p
                                  style={{
                                    marginTop: "-15px",
                                    marginBottom: "-15px",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <p className="dates-text">
                                    <span className="date-text">Day, </span>23
                                    Oktonber
                                  </p>
                                </p>
                              </section>
                            </nav>
                            <Row>
                              <Col lg={10}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <div>
                                    <p className="payment-title">
                                      {updateData?.trip?.title}
                                    </p>
                                    <p className="small-text">
                                      {updateData?.trip?.country?.name}
                                    </p>
                                    {(() => {
                                      if (
                                        updateData?.status === "Waiting approve"
                                      ) {
                                        return (
                                          <p className="status-payment">
                                            {updateData?.status}
                                          </p>
                                        );
                                      } else if (
                                        updateData?.status === "Approve"
                                      ) {
                                        return (
                                          <p className="status-payment-approve">
                                            {updateData?.status}
                                          </p>
                                        );
                                      } else {
                                        return (
                                          <p className="status-payment-cancel">
                                            {updateData?.status}
                                          </p>
                                        );
                                      }
                                    })()}
                                  </div>
                                  <div>
                                    <div>
                                      <p className="payment-text-bold">date</p>
                                      <p className="small-text-petite">
                                        {moment(
                                          updateData?.trip?.dateTrip
                                        ).format("DD MMMM YYYY")}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="payment-text-bold">
                                        accomodation
                                      </p>{" "}
                                      <p className="small-text-petite">
                                        {updateData?.trip?.accomodation}
                                      </p>
                                    </div>
                                  </div>{" "}
                                  <div>
                                    <div>
                                      {" "}
                                      <p className="payment-text-bold">
                                        Duration
                                      </p>{" "}
                                      <p className="small-text-petite">{`${updateData?.trip?.day} Day, ${updateData?.trip?.night} Night `}</p>
                                    </div>
                                    <p className="payment-text-bold">
                                      Transportation
                                    </p>{" "}
                                    <p className="small-text-petite">
                                      {updateData?.trip?.transportation}
                                    </p>
                                  </div>{" "}
                                </div>
                              </Col>
                              {updateData?.status === "Approve" ? (
                                <Col lg={2}>
                                  <Row>
                                    <img
                                      alt=""
                                      style={{ marginTop: "20px" }}
                                      src={QRCode}
                                    />{" "}
                                    <p
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "5px",
                                      }}
                                    >
                                      QR Code
                                    </p>
                                  </Row>
                                </Col>
                              ) : (
                                <Col lg={2}>
                                  <Row>
                                    {updateData?.attachment === null ? (
                                      <div htmlFor="formFileLg">
                                        {/* {preview ? (
                                          <img
                                            style={{ marginTop: "20px" }}
                                            src={preview}
                                            alt="receipt"
                                          />
                                        ) : ( */}
                                        <div
                                          className="d-flex flex-column mt-4 justify-content-center align-items-center"
                                          style={{
                                            backgroundColor:
                                              "rgba(224, 200, 200, 25%)",
                                            color: "rgba(50,50,50,60%)",
                                            border: "2px solid",
                                            width: "10rem",
                                            height: "9rem",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            style={{ fontSize: "40px" }}
                                            icon={faFileInvoice}
                                          />
                                          <div>Attacment is empty</div>
                                        </div>
                                        {/* )} */}
                                        <input
                                          id="formFileLg"
                                          type="file"
                                          hidden
                                          name="attachment"
                                          onChange={handleChange}
                                          accept=".jpg,.jpeg,.png,.svg"
                                          required
                                        />
                                      </div>
                                    ) : (
                                      <div>
                                        <img
                                          style={{ marginTop: "20px" }}
                                          src={path + updateData?.attachment}
                                          alt="receipt"
                                        />
                                      </div>
                                    )}

                                    <p className="small-text-petiter">
                                      upload payment proof
                                    </p>
                                  </Row>
                                </Col>
                              )}
                            </Row>
                            <div style={{ marginTop: "45px" }}>
                              <div style={{ display: "flex" }}>
                                <p
                                  style={{ width: "60px" }}
                                  className="bold-text"
                                >
                                  No
                                </p>
                                <p
                                  style={{ width: "190px" }}
                                  className="bold-text"
                                >
                                  fullname
                                </p>
                                <p
                                  style={{ width: "190px" }}
                                  className="bold-text"
                                >
                                  gender
                                </p>
                                <p
                                  style={{ width: "190px" }}
                                  className="bold-text"
                                >
                                  phone
                                </p>
                              </div>

                              <hr
                                style={{
                                  marginBottom: "13px",
                                  marginTop: "-3px",
                                  border: "2px solid #858585",
                                }}
                              />
                              <Row>
                                {" "}
                                <Col lg={9}>
                                  {" "}
                                  <div style={{ display: "flex" }}>
                                    <p
                                      style={{ width: "60px" }}
                                      className="petite-text"
                                    >
                                      1
                                    </p>
                                    <p
                                      style={{ width: "190px" }}
                                      className="petite-text"
                                    >
                                      {state.user.data.fullName}
                                    </p>
                                    <p
                                      style={{ width: "190px" }}
                                      className="petite-text"
                                    >
                                      {state.user.data.gender}
                                    </p>
                                    <p
                                      style={{ width: "100px" }}
                                      className="petite-text"
                                    >
                                      {state.user.data.phone}
                                    </p>
                                  </div>
                                </Col>
                                <Col lg={3}>
                                  <p className="bold-text-total">
                                    <span className="right-petite">Qty</span>
                                    <span className="center-petite">:</span>
                                    <span>{updateData?.counterQty}</span>
                                  </p>
                                </Col>
                              </Row>

                              <hr
                                style={{
                                  marginTop: "-3px",
                                  border: "2px solid #858585",
                                }}
                              />

                              <Row>
                                <Col lg={9}></Col>
                                <Col lg={3}>
                                  <p className="bold-text-total">
                                    <span className="right-petite">Total</span>
                                    <span className="center-petite">:</span>

                                    <span className="red-text">
                                      {formatter.format(updateData?.total)}
                                    </span>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Card>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          );
        } else if (state.user.data.fullName !== "admin") {
          return (
            <div>
              {data?.status === "Waiting payment" &&
              location.pathname === "/profile" ? (
                <Card
                  onClick={() => {
                    updateAttachment(data);
                  }}
                  className="payment-card-content-waiting"
                >
                  <div style={{ margin: "0px 90px 0px 50px" }}>
                    <nav className="nav-header">
                      <section className="icon-payment">
                        <img alt="" src={Icon} />
                      </section>
                      <section className="booking-payment">
                        <p className="booking-text">Booking</p>
                        <p
                          style={{
                            marginTop: "-15px",
                            marginBottom: "-15px",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <p className="dates-text">
                            <span className="date-text">Day, </span>23 Oktonber
                          </p>
                        </p>
                      </section>
                    </nav>
                    <Row>
                      <Col lg={10}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <div>
                            <p className="payment-title">{data?.trip?.title}</p>
                            <p className="small-text">
                              {data?.trip?.country?.name}
                            </p>
                            {(() => {
                              if (data?.status === "Waiting approve") {
                                return (
                                  <p className="status-payment">
                                    {data?.status}
                                  </p>
                                );
                              } else if (data?.status === "Approve") {
                                return (
                                  <p className="status-payment-approve">
                                    {data?.status}
                                  </p>
                                );
                              } else {
                                return (
                                  <p className="status-payment-cancel">
                                    {data?.status}
                                  </p>
                                );
                              }
                            })()}
                          </div>
                          <div>
                            <div>
                              <p className="payment-text-bold">date</p>
                              <p className="small-text-petite">
                                {moment(data?.trip?.dateTrip).format(
                                  "DD MMMM YYYY"
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="payment-text-bold">accomodation</p>{" "}
                              <p className="small-text-petite">
                                {data?.trip?.accomodation}
                              </p>
                            </div>
                          </div>{" "}
                          <div>
                            <div>
                              {" "}
                              <p className="payment-text-bold">Duration</p>{" "}
                              <p className="small-text-petite">{`${data?.trip?.day} Day, ${data?.trip?.night} Night `}</p>
                            </div>
                            <p className="payment-text-bold">Transportation</p>{" "}
                            <p className="small-text-petite">
                              {data?.trip?.transportation}
                            </p>
                          </div>{" "}
                        </div>
                      </Col>

                      {data?.status === "Approve" ? (
                        <Col lg={2}>
                          <Row>
                            <img
                              alt=""
                              style={{ marginTop: "20px" }}
                              src={QRCode}
                            />{" "}
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "5px",
                              }}
                            >
                              QR Code
                            </p>
                          </Row>
                        </Col>
                      ) : (
                        <Col lg={2}>
                          <Row>
                            {data?.attachment === null ||
                            data?.attachment ===
                              "http://localhost:5000/uploads/null" ? (
                              <div htmlFor="formFileLg">
                                {preview ? (
                                  <img
                                    style={{ marginTop: "20px" }}
                                    src={preview}
                                    alt="receipt"
                                  />
                                ) : (
                                  <div
                                    className="d-flex flex-column mt-4 justify-content-center align-items-center"
                                    style={{
                                      backgroundColor:
                                        "rgba(224, 200, 200, 25%)",
                                      color: "rgba(50,50,50,60%)",
                                      border: "2px solid",
                                      // cursor: "pointer",
                                      width: "10rem",
                                      height: "9rem",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      style={{ fontSize: "40px" }}
                                      icon={faFileInvoice}
                                    />
                                    <div>Attacment is empty</div>
                                    <input
                                      id="formFileLg"
                                      type="file"
                                      hidden
                                      name="attachment"
                                      onChange={handleChange}
                                      accept=".jpg,.jpeg,.png,.svg"
                                      required
                                    />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                {(() => {
                                  if (location.pathname === "/profile") {
                                    return (
                                      <img
                                        style={{ marginTop: "20px" }}
                                        src={path + data?.attachment}
                                        alt="receipt"
                                      />
                                    );
                                  } else {
                                    return (
                                      <img
                                        style={{ marginTop: "20px" }}
                                        src={data?.attachment}
                                        alt="receipt"
                                      />
                                    );
                                  }
                                })()}
                              </div>
                            )}
                            <p className="small-text-petiter">
                              upload payment proof
                            </p>
                          </Row>
                        </Col>
                      )}
                    </Row>
                    <div style={{ marginTop: "45px" }}>
                      <div style={{ display: "flex" }}>
                        <p style={{ width: "60px" }} className="bold-text">
                          No
                        </p>
                        <p style={{ width: "190px" }} className="bold-text">
                          fullname
                        </p>
                        <p style={{ width: "190px" }} className="bold-text">
                          gender
                        </p>
                        <p style={{ width: "190px" }} className="bold-text">
                          phone
                        </p>
                      </div>

                      <hr
                        style={{
                          marginBottom: "13px",
                          marginTop: "-3px",
                          border: "2px solid #858585",
                        }}
                      />
                      <Row>
                        {" "}
                        <Col lg={9}>
                          {" "}
                          <div style={{ display: "flex" }}>
                            <p
                              style={{ width: "60px" }}
                              className="petite-text"
                            >
                              1
                            </p>
                            <p
                              style={{ width: "190px" }}
                              className="petite-text"
                            >
                              {state.user.data.fullName}
                            </p>
                            <p
                              style={{ width: "190px" }}
                              className="petite-text"
                            >
                              {state.user.data.gender}
                            </p>
                            <p
                              style={{ width: "100px" }}
                              className="petite-text"
                            >
                              {state.user.data.phone}
                            </p>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <p className="bold-text-total">
                            <span className="right-petite">Qty</span>
                            <span className="center-petite">:</span>
                            <span>{data?.counterQty}</span>
                          </p>
                        </Col>
                      </Row>

                      <hr
                        style={{
                          marginTop: "-3px",
                          border: "2px solid #858585",
                        }}
                      />

                      <Row>
                        <Col lg={9}></Col>
                        <Col lg={3}>
                          <p className="bold-text-total">
                            <span className="right-petite">Total</span>
                            <span className="center-petite">:</span>

                            <span className="red-text">
                              {formatter.format(data?.total)}
                            </span>
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="payment-card-content">
                  <div style={{ margin: "0px 90px 0px 50px" }}>
                    <nav className="nav-header">
                      <section className="icon-payment">
                        <img alt="" src={Icon} />
                      </section>
                      <section className="booking-payment">
                        <p className="booking-text">Booking</p>
                        <p
                          style={{
                            marginTop: "-15px",
                            marginBottom: "-15px",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <p className="dates-text">
                            <span className="date-text">Day, </span>23 Oktonber
                          </p>
                        </p>
                      </section>
                    </nav>
                    <Row>
                      <Col lg={10}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <div>
                            <p className="payment-title">{data?.trip?.title}</p>
                            <p className="small-text">
                              {data?.trip?.country?.name}
                            </p>
                            {(() => {
                              if (data?.status === "Waiting approve") {
                                return (
                                  <p className="status-payment">
                                    {data?.status}
                                  </p>
                                );
                              } else if (data?.status === "Approve") {
                                return (
                                  <p className="status-payment-approve">
                                    {data?.status}
                                  </p>
                                );
                              } else {
                                return (
                                  <p className="status-payment-cancel">
                                    {data?.status}
                                  </p>
                                );
                              }
                            })()}
                          </div>
                          <div>
                            <div>
                              <p className="payment-text-bold">date</p>
                              <p className="small-text-petite">
                                {moment(data?.trip?.dateTrip).format(
                                  "DD MMMM YYYY"
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="payment-text-bold">accomodation</p>{" "}
                              <p className="small-text-petite">
                                {data?.trip?.accomodation}
                              </p>
                            </div>
                          </div>{" "}
                          <div>
                            <div>
                              {" "}
                              <p className="payment-text-bold">Duration</p>{" "}
                              <p className="small-text-petite">{`${data?.trip?.day} Day, ${data?.trip?.night} Night `}</p>
                            </div>
                            <p className="payment-text-bold">Transportation</p>{" "}
                            <p className="small-text-petite">
                              {data?.trip?.transportation}
                            </p>
                          </div>{" "}
                        </div>
                      </Col>

                      {data?.status === "Approve" ? (
                        <Col lg={2}>
                          <Row>
                            <img
                              alt=""
                              style={{ marginTop: "20px" }}
                              src={QRCode}
                            />{" "}
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "5px",
                              }}
                            >
                              QR Code
                            </p>
                          </Row>
                        </Col>
                      ) : (
                        <Col lg={2}>
                          <Row>
                            {data?.attachment === null ||
                            data?.attachment ===
                              "http://localhost:5000/uploads/null" ? (
                              <label htmlFor="formFileLg">
                                {preview ? (
                                  <img
                                    style={{ marginTop: "20px" }}
                                    src={preview}
                                    alt="receipt"
                                  />
                                ) : (
                                  <div
                                    className="d-flex flex-column mt-4 justify-content-center align-items-center"
                                    style={{
                                      backgroundColor:
                                        "rgba(224, 200, 200, 25%)",
                                      color: "rgba(50,50,50,60%)",
                                      border: "2px solid",
                                      cursor: "pointer",
                                      width: "10rem",
                                      height: "9rem",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    <FontAwesomeIcon
                                      style={{ fontSize: "40px" }}
                                      icon={faFileInvoice}
                                    />
                                    <div>Attacment is empty</div>
                                    <input
                                      id="formFileLg"
                                      type="file"
                                      hidden
                                      name="attachment"
                                      onChange={handleChange}
                                      accept=".jpg,.jpeg,.png,.svg"
                                      required
                                    />
                                  </div>
                                )}
                              </label>
                            ) : (
                              <div>
                                {(() => {
                                  if (location.pathname === "/profile") {
                                    return (
                                      <img
                                        style={{ marginTop: "20px" }}
                                        src={path + data?.attachment}
                                        alt="receipt"
                                      />
                                    );
                                  } else {
                                    return (
                                      <img
                                        style={{ marginTop: "20px" }}
                                        src={data?.attachment}
                                        alt="receipt"
                                      />
                                    );
                                  }
                                })()}
                              </div>
                            )}
                            <p className="small-text-petiter">
                              upload payment proof
                            </p>
                          </Row>
                        </Col>
                      )}
                    </Row>
                    <div style={{ marginTop: "45px" }}>
                      <div style={{ display: "flex" }}>
                        <p style={{ width: "60px" }} className="bold-text">
                          No
                        </p>
                        <p style={{ width: "190px" }} className="bold-text">
                          fullname
                        </p>
                        <p style={{ width: "190px" }} className="bold-text">
                          gender
                        </p>
                        <p style={{ width: "190px" }} className="bold-text">
                          phone
                        </p>
                      </div>

                      <hr
                        style={{
                          marginBottom: "13px",
                          marginTop: "-3px",
                          border: "2px solid #858585",
                        }}
                      />
                      <Row>
                        {" "}
                        <Col lg={9}>
                          {" "}
                          <div style={{ display: "flex" }}>
                            <p
                              style={{ width: "60px" }}
                              className="petite-text"
                            >
                              1
                            </p>
                            <p
                              style={{ width: "190px" }}
                              className="petite-text"
                            >
                              {state.user.data.fullName}
                            </p>
                            <p
                              style={{ width: "190px" }}
                              className="petite-text"
                            >
                              {state.user.data.gender}
                            </p>
                            <p
                              style={{ width: "100px" }}
                              className="petite-text"
                            >
                              {state.user.data.phone}
                            </p>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <p className="bold-text-total">
                            <span className="right-petite">Qty</span>
                            <span className="center-petite">:</span>
                            <span>{data?.counterQty}</span>
                          </p>
                        </Col>
                      </Row>

                      <hr
                        style={{
                          marginTop: "-3px",
                          border: "2px solid #858585",
                        }}
                      />

                      <Row>
                        <Col lg={9}></Col>
                        <Col lg={3}>
                          <p className="bold-text-total">
                            <span className="right-petite">Total</span>
                            <span className="center-petite">:</span>

                            <span className="red-text">
                              {formatter.format(data?.total)}
                            </span>
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          );
        } else if (state.user.data.fullName === "admin") {
          return (
            show && (
              <div>
                {console.log(data)}
                <div className="overlay-list" onClick={onHideLogin} />
                <div className="payment-card-content-admin">
                  <div style={{ margin: "0px 90px 0px 50px" }}>
                    <nav className="nav-header">
                      <section className="icon-payment">
                        <img alt="" src={Icon} />
                      </section>
                      <section className="booking-payment">
                        <p className="booking-text">Booking</p>
                        <p
                          style={{
                            marginTop: "-15px",
                            marginBottom: "-15px",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <p className="dates-text">
                            <span className="date-text">Day, </span>23 Oktonber
                          </p>
                        </p>
                      </section>
                    </nav>
                    <Row>
                      <Col lg={10}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <div>
                            <p className="payment-title">{data?.trip.title}</p>
                            <p className="small-text">
                              {data?.trip?.country.name}
                            </p>
                            {(() => {
                              if (data?.status === "Waiting approve") {
                                return (
                                  <p className="status-payment">
                                    {data?.status}
                                  </p>
                                );
                              } else if (data?.status === "Approve") {
                                return (
                                  <p className="status-payment-approve">
                                    {data?.status}
                                  </p>
                                );
                              } else if (data?.status === "Cancel") {
                                return (
                                  <p className="status-payment-cancel">
                                    {data?.status}
                                  </p>
                                );
                              }
                            })()}
                          </div>
                          <div>
                            <div>
                              <p className="payment-text-bold">date</p>
                              <p className="small-text-petite">
                                {moment(data?.trip?.dateTrip).format(
                                  "DD MMMM YYYY"
                                )}
                              </p>
                            </div>
                            <div>
                              <p className="payment-text-bold">accomoadtion</p>{" "}
                              <p className="small-text-petite">
                                {data?.trip.accomodation}
                              </p>
                            </div>
                          </div>{" "}
                          <div>
                            <div>
                              {" "}
                              <p className="payment-text-bold">Duration</p>{" "}
                              <p className="small-text-petite">{`${data?.trip?.day} Day, ${data?.trip?.night} Night `}</p>
                            </div>
                            <p className="payment-text-bold">Transportation</p>{" "}
                            <p className="small-text-petite">
                              {data?.trip.transportation}
                            </p>
                          </div>{" "}
                        </div>
                      </Col>
                      <Col lg={2}>
                        <Row>
                          <img
                            alt=""
                            style={{ marginTop: "20px" }}
                            src={data?.attachment}
                          />{" "}
                          <p className="small-text-petiter">
                            upload payment proof
                          </p>
                        </Row>
                      </Col>
                    </Row>
                    <div style={{ marginTop: "45px" }}>
                      <div style={{ display: "flex" }}>
                        <p style={{ width: "60px" }} className="bold-text">
                          No
                        </p>
                        <p style={{ width: "190px" }} className="bold-text">
                          fullname
                        </p>
                        <p style={{ width: "190px" }} className="bold-text">
                          gender
                        </p>
                        <p style={{ width: "190px" }} className="bold-text">
                          phone
                        </p>
                      </div>

                      <hr
                        style={{
                          marginBottom: "13px",
                          marginTop: "-3px",
                          border: "2px solid #858585",
                        }}
                      />
                      <Row>
                        {" "}
                        <Col lg={9}>
                          {" "}
                          <div style={{ display: "flex" }}>
                            <p
                              style={{ width: "60px" }}
                              className="petite-text"
                            >
                              1
                            </p>
                            <p
                              style={{ width: "190px" }}
                              className="petite-text"
                            >
                              {data?.user.fullName}
                            </p>
                            <p
                              style={{ width: "190px" }}
                              className="petite-text"
                            >
                              {data?.user.gender}
                            </p>
                            <p
                              style={{ width: "100px" }}
                              className="petite-text"
                            >
                              {data?.user.phone}
                            </p>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <p className="bold-text-total">
                            <span className="right-petite">Qty</span>
                            <span className="center-petite">:</span>
                            <span>{data?.counterQty}</span>
                          </p>
                        </Col>
                      </Row>

                      <hr
                        style={{
                          marginTop: "-3px",
                          border: "2px solid #858585",
                        }}
                      />

                      <Row>
                        <Col lg={9}></Col>
                        <Col lg={3}>
                          <p className="bold-text-total">
                            <span className="right-petite">Total</span>
                            <span className="center-petite">:</span>
                            <span className="red-text">
                              {formatter.format(data?.total)}
                            </span>
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <section style={{ margin: "10px 70px 30px 0px" }}>
                      {console.log(data?.status === "Cancel")}
                      {(() => {
                        if (data?.status === "Cancel") {
                          return (
                            <button
                              onClick={adminHandleApprove}
                              className="approva"
                            >
                              Approve{" "}
                            </button>
                          );
                        } else if (data?.status === "Approve") {
                          return (
                            <button
                              onClick={adminHandleCancel}
                              className="cancela"
                            >
                              Cancel
                            </button>
                          );
                        } else {
                          return (
                            <div>
                              <button
                                onClick={adminHandleCancel}
                                className="cancela"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={adminHandleApprove}
                                className="approva"
                              >
                                Approve{" "}
                              </button>
                            </div>
                          );
                        }
                      })()}
                    </section>
                  </div>
                  {showQuota && (
                    <div>
                      <div className="pd-overlay" onClick={onHideModal} />
                      <div className="modal-alert-list">
                        <p>
                          <Alert variant="danger">
                            Can't Approve, Quota limit
                          </Alert>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          );
        }
      })()}
    </div>
  );
}

export default Payment;
