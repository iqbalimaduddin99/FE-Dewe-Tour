import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import Icon from "../assets/Icon.png";
import DropdownComponent from "./atoms/DropDown";
import { UserContext } from "../context/UserContext";
import LoginModal from "./Login";
import RegisterModal from "./Register";
import Avatar from "react-avatar";
import { API } from "../config/api";

function Header({ handleChange }) {
  const [state] = useContext(UserContext);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(async () => {
    const response = await API.get('/user');
    setProfile(response.data.data);
  }, [state.updating]);
  
  const location = useLocation();
  const handleLogin = () => setLogin(true);
  const handleRegister = () => setRegister(true);
  const onClickDropDown = () => setShowDropDown(true);

  const path = "http://localhost:5000/uploads/";
console.log(state.user.data);
  return (
    <div>
      {(() => {
        if (location.pathname === "/" && state.isLogin === false) {
          return (
            <header className="header">
              {" "}
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
              <div className="color-header">
                <nav className="nav-header">
                  <section className="icon">
                    <img src={Icon} alt="" />
                  </section>
                  <section className="group-login">
                    <button onClick={handleLogin} className="nav-login">
                      Login
                    </button>
                    <button onClick={handleRegister} className="nav-register">
                      Register{" "}
                    </button>
                  </section>
                </nav>
                <p className="lp-desc">Explore</p>
                <p className="lp-description">your amazing city together</p>
                <div className="container">
                  <input onChange={handleChange} className="input-header" />
                  <button className="btn-header">Search</button>
                </div>
              </div>
            </header>
          );
        } else if (location.pathname !== "/" && state.isLogin === false) {
          return (
            <div>
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
              <nav className="nav">
                <section className="icon">
                  <img src={Icon} alt="" />
                </section>
                <section className="group-login">
                  <button onClick={handleLogin} className="nav-login">
                    Login
                  </button>
                  <button onClick={handleRegister} className="nav-register">
                    Register{" "}
                  </button>
                </section>
              </nav>
            </div>
          );
        } else if (location.pathname === "/" && state.isLogin === true) {
          return (
            <header className="header">
              <DropdownComponent
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
              />
              <div className="color-header">
                <nav className="nav-header">
                  <section className="icon">
                    <img src={Icon} alt="" />
                  </section>
                  {profile?.image !== null ? (
                    <img
                      src={path + profile?.image}
                      onClick={onClickDropDown}
                      className="icon-profile"
                    />
                  ) : (
                    <Avatar
                      onClick={onClickDropDown}
                      className="icon-profile-avatar"
                      name={state?.user?.data.fullName}
                    />
                  )}
                </nav>
                <p className="lp-desc">Explore</p>
                <p className="lp-description">your amazing city together</p>
                <div className="container">
                  <input onChange={handleChange} className="input-header" />
                  <button className="btn-header">Search</button>
                </div>
              </div>
            </header>
          );
        } else if (location.pathname !== "/" && state.isLogin === true) {
          return (
            <div>
              <DropdownComponent
                showDropDown={showDropDown}
                setShowDropDown={setShowDropDown}
              />{" "}
              <nav className="nav">
                <section className="icon">
                  <img src={Icon} alt="" />
                </section>
                <section onClick={onClickDropDown}>
                  {profile?.image !== null ? (
                    <img
                      src={path + profile?.image}
                      onClick={onClickDropDown}
                      className="icon-profile"
                    />
                  ) : (
                    <Avatar
                      onClick={onClickDropDown}
                      className="icon-profile-avatar"
                      name={state?.user?.data.fullName}
                    />
                  )}
                </section>
              </nav>
            </div>
          );
        }
      })()}
    </div>
  );
}

export default Header;
