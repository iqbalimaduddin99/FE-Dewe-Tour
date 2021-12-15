import { useEffect, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import Pin from "../assets/VectorPin.png";
import { API } from "../config/api";

function Post() {
  const [input, setInput] = useState({
    title: "",
    country: "",
    accomodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    dateTrip: "",
    price: "",
    quota: "",
    description: "",
    imageFile: "",
  });
  const [country, setCountry] = useState();
  const [message, setMessage] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);

  // console.log(preview);
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      console.log("filesArray: ", filesArray);
      setSelectedFiles(...selectedFiles, selectedFiles.concat(filesArray));
    }
  };

  const getCountry = async () => {
    const response = await API.get("/countries");
    setCountry(response.data.data);
  };

  useEffect(() => {
    getCountry();
  }, []);

  console.log(selectedFiles);
  console.log(input.dateTrip);

  console.log(input.dateTrip);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("countryId", input.country);
      formData.append("accomodation", input.accomodation);
      formData.append("transportation", input.transportation);
      formData.append("eat", input.eat);
      formData.append("day", input.day);
      formData.append("night", input.night);
      formData.append("dateTrip", input.dateTrip);
      formData.append("price", input.price);
      formData.append("quota", input.quota);
      formData.append("description", input.description);
      for (let i = 0; i < input.imageFile.length; i++) {
        formData.append("image", input.imageFile[i]);
      }
      
      const response = await API.post("/trip", formData, config);
      setMessage(response.data.message);
      setInput({
        title: "",
        country: "",
        accomodation: "",
        transportation: "",
        eat: "",
        day: "",
        night: "",
        dateTrip: "",
        price: "",
        quota: "",
        description: "",
        imageFile: "",
      });
      setSelectedFiles([])
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div style={{ margin: "50px 100px 50px" }}>
      <p className="title-bold-add">Add Trip</p>
      {["success"].map(
        (variant, idx) =>
          message && (
            <Alert className="error-msg" key={idx} variant={variant}>
              {message}
            </Alert>
          )
      )}
      <Form onSubmit={handleSubmit}>
        <label className="label-form"> Title Trip </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className="form-post"
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
            required="on"
          />
        </Form.Group>
        <label className="label-form">Country </label>

        <Form.Group controlId="formBasicPassword">
          <select
            name="country"
            value={input.country}
            onChange={handleChange}
            className="form-select"
            aria-label="Default select example"
          >
            <option style={{ fontWeight: "bold" }} hidden>
              Choose Country
            </option>
            {country?.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </Form.Group>

        <label className="label-form"> Accomodation </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className="form-post"
            type="text"
            name="accomodation"
            autocomplete="off"
            value={input.accomodation}
            onChange={handleChange}
            required="on"
          />
        </Form.Group>
        <label className="label-form"> Transportation </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className="form-post"
            type="text"
            name="transportation"
            value={input.transportation}
            onChange={handleChange}
            required="on"
          />
        </Form.Group>
        <label className="label-form"> Eat </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className="form-post"
            type="text"
            name="eat"
            value={input.eat}
            onChange={handleChange}
            required="on"
          />
        </Form.Group>
        <label className="label-form"> Duration </label>
        <div style={{ display: "flex" }}>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="form-post"
              type="text"
              name="day"
              value={input.day}
              onChange={handleChange}
              required="on"
            />
          </Form.Group>

          <label className="label-form" style={{ margin: "4px 40px 0px 20px" }}>
            {" "}
            Day{" "}
          </label>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="form-post"
              name="night"
              value={input.night}
              onChange={handleChange}
              type="text"
              required="on"
            />
          </Form.Group>

          <label className="label-form" style={{ margin: "4px 40px 0px 20px" }}>
            {" "}
            Night{" "}
          </label>
        </div>
        <label className="label-form">Quota</label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className="form-post"
            type="text"
            name="quota"
            value={input.quota}
            onChange={handleChange}
            required="on"
          />
        </Form.Group>
        <label className="label-form"> Date Trip </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className="form-post"
            type="date"
            name="dateTrip"
            value={input.dateTrip}
            onChange={handleChange}
            required="on"
          />
        </Form.Group>
        <label className="label-form"> Price</label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            className="form-post"
            type="number"
            name="price"
            value={input.price}
            onChange={handleChange}
            required="on"
          />
        </Form.Group>
        <label className="label-form"> Description</label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            as="textarea"
            className="form-post"
            name="description"
            value={input.description}
            type="text"
            onChange={handleChange}
          />
        </Form.Group>
        <p className="label-form">Image</p>
        <label>
          {selectedFiles?.map((item) => {
            return (
              <img
                style={{ marginTop: "20px", marginBottom: "30px" }}
                src={item}
                alt="receipt"
              />
            );
          })}

          <div className="add-image-file">
            <section>Attach Here</section>
            <section>
              <img src={Pin} alt="" />
            </section>
            <input
              id="formFileLg"
              type="file"
              hidden
              name="imageFile"
              onChange={(e) => handleChange(e)}
              accept=".jpg,.jpeg,.png,.svg"
              multiple
              // required
            />
          </div>
        </label>
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
