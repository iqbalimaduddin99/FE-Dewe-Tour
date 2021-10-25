import { useState } from "react";
import { Card, Form } from "react-bootstrap";

function Post() {
  const [input, setInput] = useState({title:"",country:'',accomodation:'',transportation:'',eat:'',day:'',night:'',dateTrip:'',price:'',description:'',imageFile:''})
  const [preview, setPreview] = useState()

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    
  if (e.target.type === "file") {
    let url = URL.createObjectURL(e.target.files[0]);
    setPreview(url); }
  }   

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
    const getItem = localStorage.getItem("posting");
    const postData = JSON.parse(getItem);

    const inputPostData = []
    if ( postData !== null) {
      inputPostData.push(...postData)
    }
    inputPostData.push(input)

    localStorage.setItem("posting", JSON.stringify(inputPostData));

    } catch (error) {
      
    }
  }

  return (
    <div style={{ margin: "50px 100px 50px" }}>
      <p className="title-bold-add">Add Trip</p>
      <Form onSubmit={handleSubmit}>
        <label className="label-form"> Title Trip </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-post" type="text" name="title" value={input.title} onChange={handleChange} />
        </Form.Group>
        <label className="label-form">Country </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-post" type="text" name="country" value={input.country} onChange={handleChange} />
        </Form.Group>
        <label className="label-form"> Accomodation </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-post" type="text" name="accomodation" value={input.accomodation} onChange={handleChange} />
        </Form.Group>
        <label className="label-form"> Transportation </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-post" type="text" name="transportation" value={input.transportation}  onChange={handleChange} />
        </Form.Group>
        <label className="label-form"> Eat </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-post" type="text" name="eat" value={input.eat} onChange={handleChange} />
        </Form.Group>
        <label className="label-form"> Duration </label>
        <div style={{ display: "flex" }}>
          <Form.Group controlId="formBasicPassword">
            <Form.Control className="form-post" type="text" name="day" value={input.day} onChange={handleChange} />
          </Form.Group>

          <label className="label-form" style={{margin:'4px 40px 0px 20px'}}> Day </label>
          <Form.Group controlId="formBasicPassword">
            <Form.Control className="form-post" name="night" value={input.night} onChange={handleChange} type="text" />
          </Form.Group>

          <label className="label-form" style={{margin:'4px 40px 0px 20px'}}> Night </label>
        </div>
        <label className="label-form"> Date Trip </label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-post" type="text" name="dateTrip" value={input.dateTrip} onChange={handleChange} />
        </Form.Group>
        <label className="label-form"> Price</label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control className="form-post" type="text" name="price" value={input.price} onChange={handleChange} />
        </Form.Group>
        <label className="label-form"> Description</label>
        <Form.Group controlId="formBasicPassword">
          <Form.Control as="textarea" className="form-post" name="description" value={input.description} type="text" onChange={handleChange} />
        </Form.Group>
        <p className="label-form">Image</p>
        <label className="label-form"> 
        
        {preview ? 
                      <img style={{ marginTop: "20px" }} src={preview} alt="receipt"  />
                     :
                  <div
                    className="d-flex flex-column mt-4 justify-content-center align-items-center"
                 
                  >

                  </div>
                  }

                  <input
                    id="formFileLg"
                    type="file"
                    // hidden
                    name="imageFile"
                    onChange={(e)=> handleChange(e)}
                    accept=".jpg,.jpeg,.png,.svg"
                    required
                  />        
        </label>
        <div className="form-group-login">
          <button className="button-login" type='submit'>
            Add Trip
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Post;
