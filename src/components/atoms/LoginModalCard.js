import React, { useState, useContext } from "react";
import leaf from "../../assets/palm 1 (1).png";
import flower from "../../assets/hibiscus 1 (1).png";
import { UserContext } from "../../context/UserContext";
import { Form, Alert } from "react-bootstrap";
import { useHistory, useLocation } from "react-router";
import { API } from "../../config/api";

const LoginModal = ({ login, setLogin, setRegister }) => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState();
  const history = useHistory();
  const onHideLogin = () => setLogin(!login);
  const [, dispatch] = useContext(UserContext);
  const { email, password } = input;
  const location = useLocation();

  const onChangeInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(input);

      const response = await API.post("/login", body, config);

      if (response.data.status === "Failed") {
        setError(response.data.message);
      }
      if (response.data.status === "failed") {
        setError(response.data.message);
      }

      if (response.data.status === "success") {
        dispatch({
          type: "login_success",
          payload: response.data.data,
        });
        setInput({
          email: "",
          password: "",
        });
        setError();

        // if (location.pathname)
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setError(error.response.data.message);
      }
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
        <div className="lp-modal-content-at-login">
          <img className="leaf" src={leaf} alt="" />
          <img className="flower" src={flower} alt="" />

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
          <div style={{ marginBottom: "20px" }}>
            {
                error && 
                  <Alert className="error-msg" variant={'danger'}>
                    {error}
                  </Alert>
                
          }
          </div>
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
              <button className="button-login" type="submit">
                Login
              </button>
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
