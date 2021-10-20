import Icon from "../assets/Icon.png";

import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router";

function CardContent({ item, number }) {
  const history = useHistory();

  const handlePost = (id) => {
    history.push(`post-detail/${id}`);
  };
  return (
    <Col lg={4}>
      <Card onClick={() => handlePost(number)} className="card-content">
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <div className="nav-header">
            <p>Rp.20w92</p>
            <p> Japan</p>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CardContent;
