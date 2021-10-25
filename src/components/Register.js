import React, { useState, useContext } from "react";

import leaf from "../assets/palm 1 (1).png";
import flower from "../assets/hibiscus 1 (1).png";
import { UserContext } from "../context/UserContext";
import { API, setAuthToken } from "../config/api";
import { Button, Form, Modal } from "react-bootstrap";

const RegisterModal = ({ register, setRegister, setLogin }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const [isLoading, setLoading] = useState("");
  const [error, setError] = useState("");

  const onHideLogin = () => setRegister(!register);
  const { email, password, fullName, phone, address } = input;

  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const getItem = localStorage.getItem("registered");
      const userData = JSON.parse(getItem);
      console.log(userData)
      const findRegister = userData?.find((item) => item.email === input.email)
      if (userData !== null && findRegister ) {
        alert("Email already registered");
      }

      const inputData = []
      if (  userData !== null ) {
        inputData.push(...userData)
      }
      inputData.push(input)

      localStorage.setItem("registered", JSON.stringify(inputData));

      setInput({
        email: "",
        password: "",
        fullName: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      // const e = error?.res;
      // if (e === 401 || e === 400) {
      //   setError(error?.res.data.message);
      // }

      console.log(error);
      console.log(error?.res);
    } finally {
      setTimeout(() => setError(""), 5000);
      setLoading("");
    }
    // console.log(error);
  };

  const onClickLogin = () => {
    setRegister(!register);
    setLogin(true);
  };

  return (
    register && (
      <div>
        <div className="overlay" onClick={onHideLogin} />
        <div className="lp-modal-content-login">
          <img className="leaf" src={leaf} />
          <img className="flower" src={flower} />

          <h1
            style={{
              marginTop: "-40px",
              marginBottom: "45px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Register
          </h1>
          <Form onSubmit={onSubmitRegister}>
            <label className="label-form"> Full Name </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                name="fullName"
                value={fullName}
                type="text"
                placeholder="Full Name"
                onChange={onChangeInput}
                required="on"
              />
            </Form.Group>

            <label className="label-form"> Email </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                name="email"
                value={email}
                type="email"
                placeholder="Email"
                onChange={onChangeInput}
                required="on"
              />
            </Form.Group>

            <label className="label-form"> Password </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={onChangeInput}
                required="on"
              />
            </Form.Group>
            <label className="label-form"> Phone </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                name="phone"
                value={phone}
                type="number"
                placeholder="Phone"
                onChange={onChangeInput}
              />
            </Form.Group>
            <label className="label-form"> Address </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                name="address"
                value={address}
                as="textarea"
                type="text"
                placeholder="Address"
                onChange={onChangeInput}
              />
            </Form.Group>

            <div className="form-group-login">
              <button className="button-login" type="submit">
                {isLoading ? isLoading : "Register"}
              </button>
            </div>
            <p className="lp-click-here">
              Already have an account ? Click{" "}
              <span onClick={onClickLogin}>Here</span>
            </p>
          </Form>
        </div>
      </div>
    )
  );
};

export default RegisterModal;

// const config = {
//     headers: {
//         "Content-type": "application/json"
//     }
// }

// const body = JSON.stringify({
//     email,
//     password
// })
//   // setLoading('Wait ...')
//   const res = await API.post('/login', body, config)
//   const token = res.data.data.user.token

//   console.log(res)
//   console.log(res.data.data.user.token)

//   console.log(res.data.data.user);
//   localStorage.setItem('token', token)
//   setAuthToken(token)
//   dispatch({
// 			type: 'login_success',
// 			payload: res.data.data.user
// 		})
