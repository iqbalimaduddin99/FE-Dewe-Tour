import { Container, Row, Col, Card } from "react-bootstrap";
import Rectangle from "../assets/Rectangle.png";
import hotel from "../assets/hotel 1.png";
import plane from "../assets/plane 1.png";
import eat from "../assets/meal 1.png";
import duration from "../assets/time 1.png";
import calender from "../assets/calendar 1.png";

import { useParams, useHistory } from "react-router-dom";
import { data } from "./atoms/FakeData";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import LoginModal from "./Login";
import RegisterModal from "./Register";

function PostDetail() {
  const { id } = useParams();
  const [number, setNumber] = useState(0);
  const history = useHistory();
  const [state] = useContext(UserContext);
  const [imageSet, setImageSet] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [input, setInput] = useState({  title: "",
  country: "",
  accomodation: "",
  transportation: "",
  eat: "",
  duration:"",
  // day: "",
  // night: "",
  dateTrip: "",
  price: "",
  quota:'',
  description: "",
  imageFile: ""})

  const handleRegister = () => setRegister(true);

  const findData = data.find((item) => item.id === parseInt(id));
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  const handleClickImage = () => {
    setImageSet(true);
  };
  const handleClickHideImage = () => {
    setImageSet(false);
  };
  const Decrement = () => {
    setNumber(number - 1);
    if (number < 1) {
      setNumber(0);
    }
  };
  const Increment = () => {
    setNumber(number + 1);
  };
  const Totally = findData.price * number;

  const handleBookNow = () => {
 
    history.push("/payment");
  };

  return (
    <div>
      <LoginModal login={login} setLogin={setLogin} setRegister={setRegister} />
      <RegisterModal
        register={register}
        setRegister={setRegister}
        setLogin={setLogin}
      />
      <div className="post-detail">
        <div style={{ marginLeft: "30px" }}>
          <h1 style={{ fontSize: "45px" }}>{findData.title}</h1>
          <p style={{ fontSize: "22px", color: "#858585", fontWeight: "600" }}>
            {findData.country}
          </p>
        </div>
        <div>
          <img className="first-image" src={findData.image[0].image} />
        </div>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {findData.image.length > 3 ? (
            imageSet ? (
              <>
              {findData.image.map((item) => (
                <>
                  <>
                    <Col style={{ marginTop: "20px" }} lg={4}>
                      <img
                        style={{
                          width: "100%",
                          height: "280px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                        src={item.image}
                      />
                    </Col>
                  </>
                </>
              ))}
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
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      src={findData.image[0].image}
                    />
                  </Col>
                </>
                <>
                  <Col style={{ marginTop: "20px" }} lg={4}>
                    <img
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      src={findData.image[1].image}
                    />
                  </Col>
                </>
                <>
                  <Col style={{ marginTop: "20px" }} lg={4}>
                    <img
                      style={{
                        width: "100%",
                        height: "280px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                      src={findData.image[2].image}
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
            findData.image.map((item) => (
              <>
                <Col style={{ marginTop: "20px" }} lg={4}>
                  <img
                    style={{
                      width: "100%",
                      height: "280px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    src={item.image}
                  />
                </Col>
              </>
            ))
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
                <img style={{ marginRight: "10px" }} src={hotel} />
                {findData.accomodation}
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Transportation</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img style={{ marginRight: "10px" }} src={plane} />
                {findData.transportation}
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Eat</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img style={{ marginRight: "10px" }} src={eat} />
                {findData.eat}
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Duration</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img style={{ marginRight: "10px" }} src={duration} />
                {findData.duration}
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Date</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img style={{ marginRight: "10px" }} src={calender} />
                {findData.dateTrip}
              </p>
            </div>
          </div>
          <p className="info-trip-title-desc">Description</p>
          <p className="info-trip-desc">{findData.description}</p>

          <div className="nav-header">
            <section>
              <p className="price-dp">
                {formatter.format(findData.price)}{" "}
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
                <p className="number-plus-min">{number}</p>
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
              <p className="price-dp">{formatter.format(Totally)}</p>
            </section>
          </div>

          <hr style={{ marginTop: "2px", border: "2px solid #858585" }} />
          <div className="book-now">
            {state.isLogin === true ? (
              <button onClick={handleBookNow} className="book-now-button">
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
