import { useState } from "react";
import { Form } from "react-bootstrap";
import { API } from "../../config/api";
import { Alert } from "react-bootstrap";

function AddCountry({ show, setShow }) {
  const [input, setInput] = useState({
    name: "",
  });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(input);

      const response = await API.post("/country", body, config);
      setSuccess()
      setError()
      setTimeout(() => {
        setSuccess(response.data.message);
        setError(response.data.message);
      }, 5);
    } catch (error) {
      console.log(error);
    }
  };
  const onHideLogin = () => {
    setShow(false);
  };

  return (
    show && (
      <div>
        <div className="overlay-country" onClick={onHideLogin} />
        <div className="country">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              // marginBottom: "-40px",
            }}
          >
            <p style={{ fontWeight: "bold", fontSize: "38px" }}>Add Country</p>
          </div>
          {success === "Country success created"
            ? ["success"].map((variant, idx) => (
                <Alert
                  style={{ width: "60%", textAlign: "center", margin: "auto" }}
                  key={idx}
                  variant={variant}
                >
                  {success}
                </Alert>
              ))
            : ["danger"].map(
                (variant, idx) =>
                  error && (
                    <Alert
                      style={{
                        width: "60%",
                        textAlign: "center",
                        margin: "auto",
                      }}
                      key={idx}
                      variant={variant}
                    >
                      {error}
                    </Alert>
                  )
              )}
          <Form style={{ margin: "10px 100px 50px" }} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="form-post"
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="form-group-login">
              <button className="button-login" type="submit">
                Add Country
              </button>
            </div>
          </Form>
        </div>
      </div>
    )
  );
}

export default AddCountry;
