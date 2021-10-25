import Icon from "../assets/Icon.png";
import { Card, Container, Row } from "react-bootstrap";
import CardContent from "./atoms/Card";
import {data} from './atoms/FakeData'

import Guarantee from "../assets/guarantee 1.png";
import Heart from "../assets/heart 1.png";
import Agent from "../assets/agent 1.png";
import Support from "../assets/support 1.png";
import { useHistory } from "react-router";

function LandingPage({search}) {
  const history = useHistory();
  // const dataJs = JSON.parse({data})

  // console.log(data)
  return (
    <div style={{ backgroundColor: " #f1f1f1" }}>
      <div className="lp-color">
        <Card className="lp-card-content">
          <div className="continer-img">
            <Card.Img className="img-card-content" src={Guarantee} />
          </div>
          <div className="continer">
            <p className="title-continer">Best Price Guarantee</p>
          </div>
          <div className="continer">
            <Card.Text className="text-continer">
              A small river named Duren flows by their place and supplies
            </Card.Text>
          </div>
        </Card>{" "}
        <Card className="lp-card-content">
          <div className="continer-img">
            <Card.Img className="img-card-content" src={Heart} />
          </div>
          <div className="continer">
            <p className="title-continer">Travellers Love Us</p>
          </div>
          <div className="continer">
            <Card.Text className="text-continer">
              A small river named Duren flows by their place and supplies
            </Card.Text>
          </div>
        </Card>{" "}
        <Card className="lp-card-content">
          <div className="continer-img">
            <Card.Img className="img-card-content" src={Agent} />
          </div>
          <div className="continer">
            <p className="title-continer">Best Travel Agent</p>
          </div>
          <div className="continer">
            <Card.Text className="text-continer">
              A small river named Duren flows by their place and supplies
            </Card.Text>
          </div>
        </Card>{" "}
        <Card className="lp-card-content">
          <div className="continer-img">
            <Card.Img className="img-card-content" src={Support} />
          </div>
          <div className="continer">
            <p className="title-continer">Our Dedicated Support</p>
          </div>
          <div className="continer">
            <Card.Text className="text-continer">
              A small river named Duren flows by their place and supplies
            </Card.Text>
          </div>
        </Card>
      </div>

      <div className="continer">
        <p className="group-tour">Group Tour</p>
      </div>
      {/* <Container>
        <Row> */}
        <div className="layout-card">
          {data.filter((cards) => {
                  if (search == "") {
                    return cards;
                  } else if (
                    cards?.title?.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return cards;
                  } else if (
                    cards?.description
                      ?.toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return cards;
                  }
                })
                .map((item, index) => (
            <CardContent item={item} number={index} />
          ))}
        {/* </Row>
      </Container> */}
      </div>
    </div>
  );
}

export default LandingPage;
