import Icon from "../../assets/Icon.png";

import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function CardContent({ item, number }) {
  const history = useHistory();
  const [state] = useContext(UserContext);
  const handlePost = (id) => {
    history.push(`post-detail/${id}`);
  };

  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  
  return (
    // <Col lg={6}>
    <div>
      {state.user.fullName === "admin" ? (
        <Card className="card-content-admin">
          <img className="img-card" src={item.image[0].image} />
          <Card.Body>
            <Card.Title>
              {item.title.length > 21
                ? `${item.title.substring(0, 25)}...`
                : item.title}
            </Card.Title>
            <div className="nav-header">
              <p className="price-card">{formatter.format(item.price)} </p>
              <p className="place-card"> {item.country}</p>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card onClick={() => handlePost(item.id)} className="card-content">
          <img className="img-card" src={item.image[0].image} />

          <div className='quota'>
                11/{item.quota}
          </div>
          <Card.Body>
            <Card.Title>
              {item.title.length > 21
                ? `${item.title.substring(0, 25)}...`
                : item.title}
            </Card.Title>
            <div className="nav-header">
              <p className="price-card">{formatter.format(item.price)} </p>
              <p className="place-card"> {item.country}</p>
            </div>
            
          </Card.Body>
        
        </Card>
      )}
    </div>
    // </Col>
  );
}

export default CardContent;
