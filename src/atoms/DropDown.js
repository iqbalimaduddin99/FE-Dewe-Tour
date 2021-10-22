import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router";
import { UserContext } from "../context/UserContext";

function DropdownComponent({ showDropDown, setShowDropDown }) {
  const [state] = useContext(UserContext);
  const onHide = () => {
    setShowDropDown(false);
  };
  const history = useHistory();
  console.log(state);
  return (
    showDropDown && (
      <div>
        {state.user.fullName === "admin" ? (
          <div>
            {" "}
            <div onClick={onHide} className="dd-overlay" />
            <div className="dd-modal">
              <Dropdown.Item onClick={() => history.push("/transaction")}>
                List Transaction
              </Dropdown.Item>
              <Dropdown.Item onClick={() => history.push("/income-trip")}>
                Data Trip
              </Dropdown.Item>
              <hr />
              <Dropdown.Item onClick={() => history.push("/logout")}>
                Logout
              </Dropdown.Item>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <div onClick={onHide} className="dd-overlay" />
            <div className="dd-modal">
              <Dropdown.Item onClick={() => history.push("/profile")}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={() => history.push("/payment")}>
                Payment
              </Dropdown.Item>
              <hr />
              <Dropdown.Item onClick={() => history.push("/logout")}>
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
