import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router";
import { UserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faClipboardList} from '@fortawesome/free-solid-svg-icons';
import user from  "../../assets/user 2.png"
import payment from  "../../assets/bill 1.png"
import logout from  "../../assets/logout 1.png"
import polygon from  "../../assets/Polygon 1.png"
import trip from "../../assets/journey 1.png"


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
        {state.user.findData.fullName === "admin" ? (
          <div>
            {" "}
            <div onClick={onHide} className="dd-overlay" />
            <img className="polygon" src={polygon} />
            <div className="dd-modal">
              <Dropdown.Item style={{marginTop:"10px", fontWeight:"bold"}} onClick={() => history.push("/transaction")}>
              <FontAwesomeIcon style={{marginLeft:'5px', marginRight:'9px', fontSize:'30px',  color:'green'}} icon={faClipboardList}/>
                List Transaction
              </Dropdown.Item>
              <Dropdown.Item style={{fontWeight:"bold"}} onClick={() => history.push("/income-trip")}>
              <img style={{marginRight:'7px'}} src={trip} />
                Data Trip
              </Dropdown.Item>
              <hr />
              <Dropdown.Item style={{fontWeight:"bold", marginTop:"-10px", marginBottom:'10px'}}  onClick={() => history.push("/logout")}>
              <img style={{marginRight:'7px'}} src={logout} />
                Logout
              </Dropdown.Item>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <div onClick={onHide} className="dd-overlay" />
            <img className="polygon" src={polygon} />
            <div className="dd-modal">  
            <Dropdown.Item style={{marginTop:"10px", fontWeight:"bold"}}  onClick={() => history.push("/")}>
              <FontAwesomeIcon style={{marginRight:'7px', fontSize:'26px',  color:'green'}} icon={faHome}/>
                Home
              </Dropdown.Item>
              <Dropdown.Item style={{fontWeight:"bold"}}  onClick={() => history.push("/profile")}>
              <img style={{marginRight:'7px'}} src={user} />
                Profile
              </Dropdown.Item>
              <Dropdown.Item  style={{fontWeight:"bold"}} onClick={() => history.push("/payment")}>
              <img style={{marginRight:'7px'}} src={payment} />
                Payment
              </Dropdown.Item>
              <hr />
              <Dropdown.Item  style={{fontWeight:"bold", marginTop:"-10px", marginBottom:'10px'}} onClick={() => history.push("/logout")}>
              <img style={{marginRight:'7px'}} src={logout} />
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
