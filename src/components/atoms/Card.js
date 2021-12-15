import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { API } from "../../config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as bookmarkIcon } from "@fortawesome/free-regular-svg-icons";
import LoginModal from "./LoginModalCard";
import RegisterModal from "./RegisterModalCard";

function CardContent({ cards, Bookmarkbookmark }) {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [data, setData] = useState();
  const [bookmark, setBookmark] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const handlePost = (id) => {
    history.push(`post-detail/${id}`);
  };
  const path = "http://localhost:5000/uploads/";
  const handleLogin = () => setLogin(true);
console.log(Bookmarkbookmark);
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  useEffect(async () => {
    const response = await API.get(`/orders`);
    setData(response.data.data);
  }, []);
  useEffect(async () => {
    const WaitingPayment = data?.filter((item) => item.status === "Approve");
    // console.log(WaitingPayment);
    setUpdateData(WaitingPayment);
  }, []);
  const handleBookmark = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ tripId: id });
      const response = await API.post("/bookmark", body, config);
      console.log(response);
      dispatch({
        type: "update",
      });
      getBookmarks(cards?.id);
    } catch (error) {
      console.log(error.response);
    }
  };

  const getBookmarks = async (id) => {
    try {
      const response = await API.get(`/bookmark/${id}`);
      console.log(response);
      if (response.data.message === `no bookmark found with id ${cards?.id}`) {
        setBookmark(false);
      } else if (response.data.message === "get bookmark success") {
        setBookmark(true);
      }
      if (Bookmarkbookmark === true) {
        setBookmark(true);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getBookmarks(cards?.id);
  }, [state.updating]);

  let cardsImage = JSON.parse(cards?.image);
  return (
    <div>
      {state.isLogin && state.user.data.status === "admin" ? (
        <div>
          {cards?.counterQty === cards?.quota ? (
            <Card className="card-content-admin">
              {cardsImage !== null ? (
                <img alt="" className="img-card" src={path + cardsImage[0]} />
              ) : (
                <img alt="" className="img-card" />
              )}

              <div className="img-card-background">
                <p>Quota is full</p>
              </div>
              {cards?.counterQty === null ? (
                <div className="quota"> 0 /{cards?.quota}</div>
              ) : (
                <div className="quota">
                  {cards?.counterQty}/{cards?.quota}
                </div>
              )}
              <Card.Body className="carbody-d-content-admin">
                <Card.Title className="card-title">{cards?.title}</Card.Title>
                <div className="nav-header">
                  <p className="price-card">{formatter.format(cards?.price)}</p>
                  <p className="place-card">{cards?.country?.name}</p>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card className="card-content-admin">
              {cardsImage !== null ? (
                <img alt="" className="img-card" src={path + cardsImage[0]} />
              ) : (
                <img alt="" className="img-card" />
              )}
              {cards?.counterQty === null ? (
                <div className="quota"> 0 /{cards?.quota}</div>
              ) : (
                <div className="quota">
                  {cards?.counterQty}/{cards?.quota}
                </div>
              )}
              <Card.Body className="carbody-d-content-admin">
                <Card.Title className="card-title">{cards?.title}</Card.Title>
                <div className="nav-header">
                  <p className="price-card">{formatter.format(cards?.price)}</p>
                  <p className="place-card">{cards?.country?.name}</p>
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      ) : (
        <div>
          {cards?.counterQty === cards?.quota ? (
            <Card className="card-content-disable">
              {cardsImage !== null ? (
                <img alt="" className="img-card" src={path + cardsImage[0]} />
              ) : (
                <img alt="" className="img-card" />
              )}

              <div className="img-card-background">
                <p>Quota is full</p>
              </div>
              {cards?.counterQty === null ? (
                <div className="quota"> 0 /{cards?.quota}</div>
              ) : (
                <div className="quota">
                  {cards?.counterQty}/{cards?.quota}
                </div>
              )}
              <Card.Body>
                <Card.Title className="card-title">{cards?.title}</Card.Title>
                <div className="nav-header">
                  <p className="price-card">
                    {formatter.format(cards?.price)}{" "}
                  </p>
                  <p className="place-card"> {cards?.country?.name}</p>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <div>
              <Card
                onClick={() => handlePost(cards?.id)}
                className="card-content"
              >
                {" "}
                {cardsImage !== null ? (
                  <img alt="" className="img-card" src={path + cardsImage[0]} />
                ) : (
                  <img alt="" className="img-car-empty" />
                )}
                {cards?.counterQty === null ? (
                  <div className="quota"> 0 /{cards?.quota}</div>
                ) : (
                  <div className="quota">
                    {cards?.counterQty}/{cards?.quota}
                  </div>
                )}
                <Card.Body>
                  <Card.Title className="card-title">
                    <div className="nav-header">
                      <div>{cards?.title}</div>
                    </div>
                  </Card.Title>
                  <div className="nav-header">
                    <p className="price-card">
                      {formatter.format(cards?.price)}{" "}
                    </p>
                    <p className="place-card"> {cards?.country?.name}</p>
                  </div>
                </Card.Body>
              </Card>
              <div className="circlebookmark">
                {state.isLogin ? (
                  bookmark ? (
                    <FontAwesomeIcon
                      className="fntawsbookmarksolid"
                      icon={faBookmark}
                      onClick={() => {
                        handleBookmark(cards.id);
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="fntawsbookmark"
                      icon={bookmarkIcon}
                      onClick={() => {
                        handleBookmark(cards.id);
                      }}
                    />
                  )
                ) : (
                  <>
                    <FontAwesomeIcon
                      className="fntawsbookmark"
                      icon={bookmarkIcon}
                      onClick={handleLogin}
                    />
                  </>
                )}
              </div>
              <LoginModal
                login={login}
                setLogin={setLogin}
                setRegister={setRegister}
              />
              <RegisterModal
                register={register}
                setRegister={setRegister}
                setLogin={setLogin}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CardContent;
