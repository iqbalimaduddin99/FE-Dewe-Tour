import React, { useState, useContext } from "react";

import leaf from "../assets/palm 1 (1).png";
import flower from "../assets/hibiscus 1 (1).png";
import { UserContext } from "../context/UserContext";
import { API, setAuthToken } from "../config/api";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router";

const LoginModal = ({ login, setLogin, setRegister}) => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [isLoading, setLoading] = useState("");
  const [error, setError] = useState("");
  const history = useHistory()
  const onHideLogin = () => setLogin(!login);
  const [, dispatch] = useContext(UserContext)
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
      const getItem = localStorage.getItem("user");
      const userData = JSON.parse(getItem);
      if (userData.email === input.email && userData.password === input.password) {
        dispatch({
          type: "login_success", 
          payload: {...userData}
        })
      history.push('/')
      } else {
        alert ('email or password wrong')
      }

        setInput({ email: "", password: "" });
      } catch (error) {
          console.log(error?.res)
      } 
    };

  const onClickRegister = () => {
    setLogin(!login);
    setRegister(true);
  };

  return (
    login && (
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
            Login
          </h1>
          <Form onSubmit={onSubmitLogin}>
            <label className="label-form"> Email </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                name="email"
                value={email}
                type="email"
                placeholder="Email"
                onChange={onChangeInput}
              />
            </Form.Group>

            <label className="label-form"> Password </label>
            <Form.Group className="form-group" controlId="formBasicPassword">
              <Form.Control
                className="form-field"
                value={password}
                name="password"
                type="password"
                placeholder="Password"
                onChange={onChangeInput}
              />
            </Form.Group>

            <div className="form-group-login">
              <button className="button-login" type="submit">{isLoading ? isLoading : "Login"}</button>
            </div>
            <p className="lp-click-here">
              Don't have an account ? Click{" "}
              <span onClick={onClickRegister}>Here</span>
            </p>
          </Form>
        </div>
      </div>
    )
  );
};

export default LoginModal;

// finally {
//   setTimeout(() => setError(""), 5000);
//   setLoading("");
// }

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
