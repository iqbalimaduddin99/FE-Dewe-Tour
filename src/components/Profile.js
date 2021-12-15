import CardPayment from "./atoms/Payment";
import { Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import email from "../assets/Email.png";
import phone from "../assets/Phone.png";
import user from "../assets/Vector.png";
import location from "../assets/place.png";
import User from "../assets/User.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { API } from "../config/api";
import ModalEdit from "./atoms/ModalEdit";

function Profile() {
  const [state] = useContext(UserContext);

  const [data, setData] = useState(null);
  const [updateData, setUpdateData] = useState();
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState();
  const [preview, setPreview] = useState(false);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  // useEffect(async () => {
  //   const response = await state.user.data;
  //   setProfile(response);
  // }, [state.updating]);

  useEffect(async () => {
    const response = await API.get('/user');
    setProfile(response.data.data);
  }, [state.updating]);
  const path = "http://localhost:5000/uploads/";

  const getData = async () => {
    const response = await API.get("/transaction");
    setUpdateData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = () => {
    setShow(!show);
  };

  const waitingPayment = () => {
    const WaitingPayment = updateData?.filter(
      (item) => item.status === "Waiting payment"
    );
    setData(WaitingPayment);
  };
  const waitingApprove = () => {
    const WaitingApprove = updateData?.filter(
      (item) => item.status === "Waiting approve"
    );
    setData(WaitingApprove);
  };
  const approved = () => {
    const Approved = updateData?.filter((item) => item.status === "Approve");
    setData(Approved);
  };
  const cancel = () => {
    const Cancel = updateData?.filter((item) => item.status === "Cancel");
    setData(Cancel);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <Card className="card-profile">
          <Row style={{ margin: "20px 30px 30px 50px " }}>
            <Col lg={7}>
              <div>
                <p style={{ margin: "10px 0px 30px" }} className="title-text">
                  Personal info
                </p>
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: "10px" }}>
                    <img alt="" style={{ width: "42px" }} src={user} />
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p className="user-text-bold">{profile?.fullName}</p>
                    <p className="small-text-petite">Full Name</p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: "10px" }}>
                    <img alt="" style={{ width: "42px" }} src={email} />
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p className="user-text-bold">{profile?.email}</p>
                    <p className="small-text-petite">Email</p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: "10px" }}>
                    <img alt="" style={{ width: "42px" }} src={phone} />
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p className="user-text-bold">{profile?.phone}</p>
                    <p className="small-text-petite">Phone</p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ marginTop: "10px" }}>
                    <img alt="" style={{ width: "42px" }} src={location} />
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p className="user-text-bold">{profile?.address}</p>
                    <p className="small-text-petite">Location</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col style={{ justifyContent: "flex-start" }} lg={5}>
              {profile?.image === null ? (
                <img alt="" className="img-profile" src={User} />
              ) : (
                <img
                  alt=""
                  className="img-profile"
                  src={path + profile?.image}
                />
              )}
              <button onClick={handleEdit} className="btn-profile">
                Edit Profile
              </button>
            </Col>
            <ModalEdit setShow={setShow} show={show} />
          </Row>
        </Card>
      </div>
      <p
        style={{ marginLeft: "8em", marginBottom: "2em" }}
        className="title-bold"
      >
        {" "}
        History Trip
      </p>
      <div class="tabs">
        <input
          type="radio"
          className="tabs__radio"
          name="tabs-example"
          id="tab1"
          onClick={waitingPayment}
        />
        <label for="tab1" className="tabs__label">
          Waiting Payment
        </label>
        <input
          type="radio"
          className="tabs__radio"
          name="tabs-example"
          id="tab2"
          onClick={waitingApprove}
        />
        <label for="tab2" className="tabs__label">
          Waiting Approve
        </label>
        <input
          type="radio"
          className="tabs__radio"
          name="tabs-example"
          id="tab3"
          onClick={approved}
        />
        <label for="tab3" className="tabs__label">
          Approve
        </label>
        <input
          type="radio"
          className="tabs__radio"
          name="tabs-example"
          id="tab4"
          onClick={cancel}
        />
        <label for="tab4" className="tabs__label">
          Cancel
        </label>
      </div>
      {data?.length === 0 ? (
        <div className="null-payment"> Transaction not found </div>
      ) : (
        <div className="history-trip">
          {data?.map((data) => {
            return <CardPayment data={data} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
