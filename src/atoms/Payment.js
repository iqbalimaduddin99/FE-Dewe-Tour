import { Card, Row, Col } from "react-bootstrap";
import Icon from "../assets/IconBlack.png";
import bill from "../assets/bill.png";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Payment({show}) {
  const [state] = useContext(UserContext)
  return  (
    <div>
      {(() => {
        if (state.user.fullName !== "admin") {
          return (
            <Card className="payment-card-content">
              <div style={{ margin: "0px 90px 0px 50px" }}>
                <nav className="nav-header">
                  <section className="icon-payment">
                    <img src={Icon} />
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
                        <p className="payment-title">
                          6D/4N Fun Tassie Vacation
                        </p>
                        <p className="small-text">Country</p>
                        <p className="status-payment">Waiting Approve</p>
                      </div>
                      <div>
                        <div>
                          <p className="payment-text-bold">date</p>
                          <p className="small-text-petite">23 August</p>
                        </div>
                        <div>
                          <p className="payment-text-bold">accomoadtion</p>{" "}
                          <p className="small-text-petite">Hotel Poris</p>
                        </div>
                      </div>{" "}
                      <div>
                        <div>
                          {" "}
                          <p className="payment-text-bold">Duration</p>{" "}
                          <p className="small-text-petite">10 Day</p>
                        </div>
                        <p className="payment-text-bold">Transportation</p>{" "}
                        <p className="small-text-petite">Plane</p>
                      </div>{" "}
                    </div>
                  </Col>
                  <Col lg={2}>
                    <Row>
                      <img style={{ marginTop: "20px" }} src={bill} />{" "}
                      <p className="small-text-petiter">upload payment proof</p>
                    </Row>
                  </Col>
                </Row>
                <div style={{ marginTop: "45px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ width: "60px" }} className="bold-text">
                      No
                    </p>
                    <p style={{ width: "190px" }} className="bold-text">
                      fulnam
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
                        <p style={{ width: "60px" }} className="petite-text">
                          1
                        </p>
                        <p style={{ width: "190px" }} className="petite-text">
                          fulnam
                        </p>
                        <p style={{ width: "190px" }} className="petite-text">
                          gender
                        </p>
                        <p style={{ width: "190px" }} className="petite-text">
                          phone
                        </p>
                      </div>
                    </Col>
                    <Col lg={3}>
                      <p className="bold-text-total">
                        <span className="right-petite">Qty</span>
                        <span className="center-petite">:</span>
                        <span> 1</span>
                      </p>
                    </Col>
                  </Row>

                  <hr
                    style={{ marginTop: "-3px", border: "2px solid #858585" }}
                  />

                  <Row>
                    <Col lg={9}></Col>
                    <Col lg={3}>
                      <p className="bold-text-total">
                        <span className="right-petite">Total</span>
                        <span className="center-petite">:</span>
                        {/* {total > 10 ? 12212 : 32323} */}
                        <span className="red-text">IDR.1234567890</span>
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          );
        } else if (state.user.fullName === "admin") {
          return show && (
            <Card className="payment-card-content">
              <div style={{ margin: "0px 90px 0px 50px" }}>
                <nav className="nav-header">
                  <section className="icon-payment">
                    <img src={Icon} />
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
                        <p className="payment-title">
                          6D/4N Fun Tassie Vacation
                        </p>
                        <p className="small-text">Country</p>
                        <p className="status-payment">Waiting Approve</p>
                      </div>
                      <div>
                        <div>
                          <p className="payment-text-bold">date</p>
                          <p className="small-text-petite">23 August</p>
                        </div>
                        <div>
                          <p className="payment-text-bold">accomoadtion</p>{" "}
                          <p className="small-text-petite">Hotel Poris</p>
                        </div>
                      </div>{" "}
                      <div>
                        <div>
                          {" "}
                          <p className="payment-text-bold">Duration</p>{" "}
                          <p className="small-text-petite">10 Day</p>
                        </div>
                        <p className="payment-text-bold">Transportation</p>{" "}
                        <p className="small-text-petite">Plane</p>
                      </div>{" "}
                    </div>
                  </Col>
                  <Col lg={2}>
                    <Row>
                      <img style={{ marginTop: "20px" }} src={bill} />{" "}
                      <p className="small-text-petiter">upload payment proof</p>
                    </Row>
                  </Col>
                </Row>
                <div style={{ marginTop: "45px" }}>
                  <div style={{ display: "flex" }}>
                    <p style={{ width: "60px" }} className="bold-text">
                      No
                    </p>
                    <p style={{ width: "190px" }} className="bold-text">
                      fulnam
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
                        <p style={{ width: "60px" }} className="petite-text">
                          1
                        </p>
                        <p style={{ width: "190px" }} className="petite-text">
                          fulnam
                        </p>
                        <p style={{ width: "190px" }} className="petite-text">
                          gender
                        </p>
                        <p style={{ width: "190px" }} className="petite-text">
                          phone
                        </p>
                      </div>
                    </Col>
                    <Col lg={3}>
                      <p className="bold-text-total">
                        <span className="right-petite">Qty</span>
                        <span className="center-petite">:</span>
                        <span> 1</span>
                      </p>
                    </Col>
                  </Row>

                  <hr
                    style={{ marginTop: "-3px", border: "2px solid #858585" }}
                  />

                  <Row>
                    <Col lg={9}></Col>
                    <Col lg={3}>
                      <p className="bold-text-total">
                        <span className="right-petite">Total</span>
                        <span className="center-petite">:</span>
                        {/* {total > 10 ? 12212 : 32323} */}
                        <span className="red-text">IDR.1234567890</span>
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <section style={{ margin: "10px 70px 30px 0px" }}>
                  <button className="cancela">Cancel</button>
                  <button className="approva">Approve </button>
                </section>
              </div>
            </Card>
          )
        }
      })()}
    </div>
  );
}

export default Payment;
