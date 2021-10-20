import React, { useState, useContext } from "react";

import leaf from "../assets/palm 1 (1).png";
import flower from "../assets/hibiscus 1 (1).png";
import { UserContext } from "../context/UserContext";
import { API, setAuthToken } from "../config/api";
import { Button, Form, Modal } from "react-bootstrap";

const RegisterModal = ({ register, setRegister, setLogin }) => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [isLoading, setLoading] = useState("");
  const [error, setError] = useState("");

  const onHideLogin = () => setRegister(!register);
  const { email, password } = input;

  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      setInput({ email: "", password: "" });
    } catch (error) {
      const e = error?.res;
      if (e === 401 || e === 400) {
        setError(error?.res.data.message);
      }

      console.log(error?.res);
      console.log(error);
    } finally {
      setTimeout(() => setError(""), 5000);
      setLoading("");
    }
    console.log(error);
  };

  const onClickLogin = () => {
    setRegister(!register);
    setLogin(true);
  };

  return register && (
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
          <Form>
          <label className="label-form"> Full Name </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                type="text"
                placeholder="Full Name"
              />
            </Form.Group>

            <label className="label-form"> Email </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <label className="label-form"> Password </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <label className="label-form"> Phone </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                type="text"
                placeholder="Phone"
              />
            </Form.Group>


            <div className="form-group-login">
              <button className="button-login" type="submit">{isLoading ? isLoading : "Register"}</button>
            </div>
            <p className="lp-click-here">
              Already have an account ? Click{" "}
              <span onClick={onClickLogin}>Here</span>
            </p>
          </Form>
        </div>
      </div>
  )
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
