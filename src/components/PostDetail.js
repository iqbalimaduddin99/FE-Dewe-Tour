import { Row, Col, Alert } from "react-bootstrap";
import hotel from "../assets/hotel 1.png";
import plane from "../assets/plane 1.png";
import eat from "../assets/meal 1.png";
import duration from "../assets/time 1.png";
import calender from "../assets/calendar 1.png";

import { useParams, useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

import LoginModal from "./Login";
import RegisterModal from "./Register";
import { API } from "../config/api";

import moment from "moment";

function PostDetail() {
  const { id } = useParams();
  const history = useHistory();
  const [state] = useContext(UserContext);
  const [imageSet, setImageSet] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [show, setShow] = useState(false);
  const [input, setInput] = useState({
    quota: 1,
  });
  const [data, setData] = useState();

  const total = data?.price * input.quota;
  const handleRegister = () => setRegister(true);
  const onHideModal = () => setShow(false);

  const getData = async () => {
    const response = await API.get(`/trip/${id}`);
    console.log(response);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data?.quota);
  console.log();
  const handleOnChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const handleClickImage = () => {
    setImageSet(true);
  };
  const handleClickHideImage = () => {
    setImageSet(false);
  };
  const Decrement = () => {
    setInput({
      ...input,
      quota: input.quota - 1,
    });
    if (input.quota < 2) {
      setInput({
        ...input,
        quota: (input.quota = 1),
      });
    }
  };
  console.log(data);
  const Increment = () => {
    setInput({
      ...input,
      quota: input.quota + 1,
    });
    if (input.quota === data?.quota - data?.counterQty) {
      setInput({
        ...input,
        quota: (input.quota = data?.quota - data?.counterQty),
      });
      setShow(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("counterQty", input?.quota);
      formData.set("total", total);
      formData.set("status", "Waiting payment");
      // formData.set("image", input.transportation);
      formData.set("tripId", id);

      const response = await API.post("/transaction", formData, config);

      history.push(`/payment/${response.data.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data?.image.map((x) => x));

  return (
    <div>
      {show && (
        <div>
          <div className="pd-overlay" onClick={onHideModal} />
          <div className="modal-alert-postdetail">
            <p>
              <Alert variant="danger">Quota limit</Alert>
            </p>
          </div>
        </div>
      )}
      <LoginModal login={login} setLogin={setLogin} setRegister={setRegister} />
      <RegisterModal
        register={register}
        setRegister={setRegister}
        setLogin={setLogin}
      />
      <div className="post-detail">
        <div style={{ marginLeft: "30px" }}>
          <h1 style={{ fontSize: "45px" }}>{data?.title}</h1>
          <p style={{ fontSize: "22px", color: "#858585", fontWeight: "600" }}>
            {data?.country?.name}
          </p>
        </div>
        <div>
          <img alt="" className="first-image" src={data?.image[0]} />
        </div>
        <Row
          style={{
            display: "flex",
          }}
        >
          {data?.image.length > 4 ? (
            imageSet ? (
              <>
                {data?.image
                  .map((item, idx) => (
                    <>
                      <>
                        <Col style={{ marginTop: "20px" }} lg={4}>
                          <img
                            alt=""
                            style={{
                              width: "100%",
                              height: "280px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                            src={item}
                          />
                        </Col>
                      </>
                    </>
                  ))
                  ?.splice(1)}
                <div onClick={handleClickHideImage} className="image-map-hide">
                  {" "}
                  <p>Hide Image</p>{" "}
                </div>
              </>
            ) : (
              <>
                <>
                  <Col style={{ marginTop: "20px" }} lg={4}>
                    <img
                      alt=""
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      src={data?.image[1]}
                    />
                  </Col>
                </>
                <>
                  <Col style={{ marginTop: "20px" }} lg={4}>
                    <img
                      alt=""
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      src={data?.image[2]}
                    />
                  </Col>
                </>
                <>
                  <Col style={{ marginTop: "20px" }} lg={4}>
                    <img
                      alt=""
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      src={data?.image[3]}
                    />

                    <div onClick={handleClickImage} className="image-map">
                      {" "}
                      <p>+ 3</p>{" "}
                    </div>
                  </Col>
                </>
              </>
            )
          ) : (
            data?.image
              .map((item) => (
                <>
                  <Col style={{ marginTop: "20px" }} lg={4}>
                    <img
                      alt=""
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      src={item}
                    />
                  </Col>
                </>
              ))
              ?.splice(1)
          )}
        </Row>

        <div style={{ margin: "5px" }}>
          <p className="info-trip-title">Information trip</p>
          <div
            style={{
              display: "flex",
              margin: "20px 0px 0px ",
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Accomodation</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img alt="" style={{ marginRight: "10px" }} src={hotel} />
                {data?.accomodation}
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Transportation</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img alt="" style={{ marginRight: "10px" }} src={plane} />
                {data?.transportation}
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Eat</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img alt="" style={{ marginRight: "10px" }} src={eat} />
                {data?.eat}
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Duration</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img alt="" style={{ marginRight: "10px" }} src={duration} />
                {`${data?.day} Day, ${data?.night} Night`}
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Date</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img alt="" style={{ marginRight: "10px" }} src={calender} />
                {moment(data?.dateTrip).format("DD MMMM YYYY")}
              </p>
            </div>
          </div>
          <p className="info-trip-title-desc">Description</p>
          <p className="info-trip-desc">{data?.description}</p>

          <div className="nav-header">
            <section>
              <p className="price-dp">
                {formatter.format(data?.price)}{" "}
                <span className="price-person-dp">/ Person</span>
              </p>
            </section>
            <section
              style={{
                display: "flex",
                // flexWrap: "wrap",
              }}
            >
              <div className="plus-min">
                <div onClick={Decrement} className="font-plus-min">
                  -
                </div>
              </div>

              <div>
                <input
                  style={{ backgroundColor: "transparent", border: "none" }}
                  disabled
                  onChange={handleOnChange}
                  name="quota"
                  value={input.quota}
                  className="number-plus-min"
                />
              </div>

              <div onClick={Increment} className="plus-min">
                <div className="font-plus-min">+</div>
              </div>
            </section>
          </div>
          <hr style={{ marginTop: "-3px", border: "2px solid #858585" }} />
          <div className="nav-header">
            <section>
              <p className="price-person-dp">Total</p>{" "}
            </section>
            <section>
              <p className="price-dp">{formatter.format(total)}</p>
            </section>
          </div>

          <hr style={{ marginTop: "2px", border: "2px solid #858585" }} />
          <div className="book-now">
            {state.isLogin === true ? (
              <button onClick={handleSubmit} className="book-now-button">
                <p className="font-book-now">Book Now</p>
              </button>
            ) : (
              <button onClick={handleRegister} className="book-now-button">
                <p className="font-book-now">Book Now</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
