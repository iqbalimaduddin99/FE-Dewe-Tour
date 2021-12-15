import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router";
import { UserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import user from "../../assets/user 2.png";
import payment from "../../assets/bill 1.png";
import logout from "../../assets/logout 1.png";
import polygon from "../../assets/Polygon 1.png";
import trip from "../../assets/journey 1.png";
import { faBookmark as bookmarkIcon } from "@fortawesome/free-regular-svg-icons";

function DropdownComponent({ showDropDown, setShowDropDown }) {
  const [state, dispatch] = useContext(UserContext);
  const onHide = () => {
    setShowDropDown(false);
  };

  const toPayment = () => {
    history.push("/payment");
    dispatch({
      type: "update",
    });
    setShowDropDown(false);
  };
  const toBookmark = () => {
    history.push("/bookmark");
    dispatch({
      type: "update",
    });
    setShowDropDown(false);
  };

  const history = useHistory();

  return (
    showDropDown && (
      <div>
        {state.user.data.fullName === "admin" ? (
          <div>
            {" "}
            <div onClick={onHide} className="dd-overlay" />
            <img alt="" className="polygon" src={polygon} />
            <div className="dd-modal">
              <Dropdown.Item
                style={{
                  marginTop: "15px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
                onClick={() => {
                  history.push("/transaction");
                  setShowDropDown(false);
                }}
              >
                <FontAwesomeIcon
                  style={{
                    marginLeft: "5px",
                    marginRight: "9px",
                    fontSize: "30px",
                    color: "green",
                  }}
                  icon={faClipboardList}
                />
                List Transaction
              </Dropdown.Item>
              <Dropdown.Item
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  history.push("/income-trip");
                  setShowDropDown(false);
                }}
              >
                <img alt="" style={{ marginRight: "7px" }} src={trip} />
                Data Trip
              </Dropdown.Item>
              <hr />
              <Dropdown.Item
                style={{
                  fontWeight: "bold",
                  marginTop: "-10px",
                  marginBottom: "10px",
                }}
                onClick={() => history.push("/logout")}
              >
                <img alt="" style={{ marginRight: "7px" }} src={logout} />
                Logout
              </Dropdown.Item>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <div onClick={onHide} className="dd-overlay" />
            <img alt="" className="polygon" src={polygon} />
            <div className="dd-modal">
              <Dropdown.Item
                style={{
                  marginTop: "15px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                }}
                onClick={() => {
                  history.push("/");
                  setShowDropDown(false);
                }}
              >
                <FontAwesomeIcon
                  style={{
                    marginRight: "7px",
                    fontSize: "26px",
                    color: "green",
                  }}
                  icon={faHome}
                />
                Home
              </Dropdown.Item>
              <Dropdown.Item
                style={{ fontWeight: "bold", marginBottom: "5px" }}
                onClick={() => {
                  history.push("/profile");
                  setShowDropDown(false);
                }}
              >
                <img alt="" style={{ marginRight: "7px" }} src={user} />
                Profile
              </Dropdown.Item>
              <Dropdown.Item style={{ fontWeight: "bold" }} onClick={toPayment}>
                <img alt="" style={{ marginRight: "7px" }} src={payment} />
                Payment
              </Dropdown.Item>
              <Dropdown.Item
                style={{
                  marginTop: "7px",
                  fontWeight: "bold",
                  paddingTop: "5px",
                  display:'flex'
                }}
                onClick={toBookmark}
              >
                <FontAwesomeIcon
                  style={{
                    marginLeft: "4px",
                    marginRight: "9px",
                    fontSize: "26px",
                    color: "green",
                  }}
                  icon={bookmarkIcon}
                />
                <p
                  style={{
                    marginLeft:'5px',
                    marginBottom:'-4px',
                    marginTop:"-2px"
                  }}
                >
                  Bookmark
                </p>
              </Dropdown.Item>
              <hr />
              <Dropdown.Item
                style={{
                  fontWeight: "bold",
                  marginTop: "-10px",
                  marginBottom: "10px",
                }}
                onClick={() => history.push("/logout")}
              >
                <img alt="" style={{ marginRight: "7px" }} src={logout} />
                Logout
              </Dropdown.Item>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default DropdownComponent;
