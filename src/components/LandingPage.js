import { Card } from "react-bootstrap";
import CardContent from "./atoms/Card";

import Guarantee from "../assets/guarantee 1.png";
import Heart from "../assets/heart 1.png";
import Agent from "../assets/agent 1.png";
import Support from "../assets/support 1.png";
import { API } from "../config/api";
import { useEffect, useState } from "react";

function LandingPage({ search }) {
  const [data, setData] = useState();

  const getData = async () => {
    const response = await API.get("trips");
    console.log(response.data.data);
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

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
      <div className="layout-card">
        {data
          ?.filter((cards) => {
            if (search === "") {
              console.log(cards?.country);
              return cards;
            } else if (
              cards?.title?.toLowerCase().includes(search.toLowerCase())
            ) {
              return cards;
            } else if (
              cards?.country?.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return cards;
            } else if (
              cards?.price?.toLowerCase().includes(search.toLowerCase())
            ) {
              return cards;
            }
          })
          ?.map((cards, key) => {
            return (
              // <div>
                // {console.log(cards)}
                <CardContent cards={cards} />
              // </div>
            );
          })}
      </div>
    </div>
  );
}

export default LandingPage;
