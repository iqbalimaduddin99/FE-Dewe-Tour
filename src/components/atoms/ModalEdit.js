import { useContext, useEffect, useState } from "react";
import { Col, Row, Card, Form, FormControl } from "react-bootstrap";
import { API } from "../../config/api";
import email from "../../assets/Email.png";
import phone from "../../assets/Phone.png";
import user from "../../assets/Vector.png";
import location from "../../assets/place.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";

function ModalEdit({ show, setShow }) {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    imageFile: [],
  });
  const [preview, setPreview] = useState();
  const [state, dispatch] = useContext(UserContext);

  const onChange = (e) => {
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
  console.log(input?.imageFile?.length);
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      if (input.name !== "") {
        formData.set("fullName", input?.name);
      }
      if (input.email !== "") {
        formData.set("email", input?.email);
      }
      if (input.phone !== "") {
        formData.set("phone", input?.phone);
      }
      if (input.address !== "") {
        formData.set("address", input?.address);
      }

      if (input?.imageFile?.length > 0) {
        formData.set("image", input?.imageFile[0]);
      }
        const response = await API.patch("/user", formData, config);

      dispatch({
        type: "update",
      });
      setInput({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      setPreview();
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onHide = () => {
    setShow(false);
  };

  return (
    show && (
      <div>
        <div onClick={onHide} className="overlay" />
        <Form onSubmit={handleEdit} className="modalEdit">
          <Row style={{ margin: "20px 30px 30px 50px " }}>
            <Col lg={7}>
              <div>
                <p style={{ margin: "10px 0px 30px" }} className="title-text">
                  Edit Profile
                </p>
                <div style={{ display: "flex" }}>
                  <div>
                    <img alt="" style={{ width: "42px" }} src={user} />
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p className="user-text-bold">Full Name</p>
                    <FormControl
                      type="text"
                      name="name"
                      className="edit-profeil-input"
                      value={input.name}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div>
                    <img alt="" style={{ width: "42px" }} src={email} />
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p className="user-text-bold">Email</p>
                    <FormControl
                      type="text"
                      name="email"
                      className="edit-profeil-input"
                      value={input.email}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div>
                    <img alt="" style={{ width: "42px" }} src={phone} />
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p className="user-text-bold">Phone</p>
                    <FormControl
                      type="text"
                      name="phone"
                      className="edit-profeil-input"
                      value={input.phone}
                      onChange={onChange}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div>
                    <img alt="" style={{ width: "42px" }} src={location} />
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <p className="user-text-bold">Address</p>
                    <FormControl
                      name="address"
                      className="edit-profeil-input"
                      value={input.address}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col style={{ justifyContent: "flex-start" }} lg={5}>
              <label>
                {preview ? (
                  <img
                    src={preview}
                    alt="receipt"
                    className="image-edit-profile"
                  />
                ) : (
                  <div className="profile-edit">
                    <FontAwesomeIcon
                      className="image-edit"
                      icon={faFileImage}
                    />
                    <p>Upload image profile here</p>
                  </div>
                )}
                <input
                  type="file"
                  name="imageFile"
                  onChange={onChange}
                  accept=".jpg,.jpeg,.png,.svg"
                  hidden
                />
              </label>
            </Col>
          </Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn-edit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    )
  );
}

export default ModalEdit;
