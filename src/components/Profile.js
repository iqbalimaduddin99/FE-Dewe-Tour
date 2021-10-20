import CardPayment from "../atoms/Payment";
import { Card, Row, Col } from "react-bootstrap";
import email from "../assets/Email.png";
import phone from "../assets/Phone.png";
import user from "../assets/Vector.png";
import location from "../assets/place.png";
import User from "../assets/Rectangle 12.png";

function Profile() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <Card className="card-profile">
          <Row style={{margin:'20px 30px 30px 50px '}}>
            <Col lg={7}>
              <div>
                
              <p style={{margin:'10px 0px 30px'}} className="title-text">Personal info</p>
                <div style={{ display: "flex" }}>
                  <div style={{marginTop:"10px"}} >
                    <img style={{width:'42px'}} src={user} />
                  </div>
                  <div style={{marginLeft:"20px"}}>
                    <p className="user-text-bold">Vermouth</p>
                    <p className="small-text-petite">Full Name</p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{marginTop:"10px"}} >
                    <img style={{width:'42px'}} src={email} />
                  </div>
                  <div style={{marginLeft:"20px"}}>
                    <p className="user-text-bold">Vermouthjongos@gmail</p>
                    <p className="small-text-petite">Email</p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{marginTop:"10px"}} >
                    <img style={{width:'42px'}} src={phone} />
                  </div>
                  <div style={{marginLeft:"20px"}}>
                    <p className="user-text-bold">666</p>
                    <p className="small-text-petite">Phone</p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{marginTop:"10px"}} >
                    <img style={{width:'42px'}} src={location} />
                  </div>
                  <div style={{marginLeft:"20px"}}>
                    <p className="user-text-bold">Jl. Peradaban</p>
                    <p className="small-text-petite">Location</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col style={{justifyContent:'flex-start'}} lg={5}>
              <img className="img-profile" src={User} />
              <button className="btn-profile">
                Edit Profile
              </button>
            </Col>
          </Row>
        </Card>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardPayment />
      </div>
    </div>
  );
}

export default Profile;
