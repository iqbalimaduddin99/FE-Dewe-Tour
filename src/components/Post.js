import { Card, Form } from "react-bootstrap";

function Post() {
  return (
    <div style={{ margin: "50px 100px 50px" }}>
      <Form>
        <label className="label-form"> Email </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-post" type="text" />
        </Form.Group>

        <label className="label-form"> Password </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-post" type="text" />
        </Form.Group>

        <div className="form-group-login">
          <button className="button-login" type="submit">
            Add Trip
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Post;
