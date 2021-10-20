import { Container, Row, Col, Card } from "react-bootstrap";
import Rectangle from "../assets/Rectangle.png";
import hotel from "../assets/hotel 1.png";
import plane from "../assets/plane 1.png";
import eat from "../assets/meal 1.png";
import duration from "../assets/time 1.png";
import calender from "../assets/calendar 1.png";

function PostDetail() {
  return (
    <div >
      <div className="post-detail">
        <div style={{ marginLeft: "30px" }}>
          <h1 style={{ fontSize: "45px" }}>Title</h1>
          <p style={{ fontSize: "22px", color: "#858585", fontWeight: "600" }}>
            Country
          </p>
        </div>
        <div>
          <img className="first-image" src={Rectangle} />
        </div>
        <Row
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Col>
            <img style={{ width: "100%" }} src={Rectangle} />
          </Col>
          <Col>
            <img style={{ width: "100%" }} src={Rectangle} />
          </Col>
          <Col>
            <img style={{ width: "100%" }} src={Rectangle} />
          </Col>
        </Row>

        <div style={{ margin: "5px" }}>
          <p className="info-trip-title">Information trip</p>
          <div
            style={{
              display: "flex",
              margin: "20px 0px 0px ",
              // justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Information trip</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img style={{ marginRight: "10px" }} src={hotel} />
                Information trip
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Information trip</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img style={{ marginRight: "10px" }} src={plane} />
                Information trip
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Information trip</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img style={{ marginRight: "10px" }} src={eat} />
                Information trip
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Information trip</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img style={{ marginRight: "10px" }} src={duration} />
                Information trip
              </p>
            </div>
            <div style={{ width: "20%" }}>
              <p className="info-trip-p">Information trip</p>
              <p style={{ fontWeight: "bold", marginTop: "-10px" }}>
                <img style={{ marginRight: "10px" }} src={calender} />
                Information trip
              </p>
            </div>
          </div>
          <p className="info-trip-title-desc">Description</p>
          <p className="info-trip-desc">Descriptioooooooooooon</p>

          <div className="nav-header">
            <section>
              <p className="price-dp">
                IDR.2000 <span className="price-person-dp">/ Person</span>
              </p>
            </section>
            <section
              style={{
                display: "flex",
                // flexWrap: "wrap",
              }}
            >
              <p className="plus-min">
                <p className="font-plus-min">-</p>
              </p>

              <div>
                <p className="number-plus-min">1</p>
              </div>

              <p className="plus-min">
                <p className="font-plus-min">+</p>
              </p>
            </section>
          </div>
          <hr style={{ marginTop: "-3px", border: "2px solid #858585" }} />
          <div className="nav-header">
            <section>
              <p className="price-person-dp">Total</p>{" "}
            </section>
            <section>
              <p className="price-dp">IDR. 200000</p>
            </section>
          </div>

          <hr style={{ marginTop: "2px", border: "2px solid #858585" }} />
          <div className="book-now">
            <button className="book-now-button">
              <p className="font-book-now">Book Now</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
