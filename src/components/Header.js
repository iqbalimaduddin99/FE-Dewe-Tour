import { useState } from "react";
import { useHistory } from "react-router";
import Icon from "../assets/Icon.png";
import LoginModal from "./Login";
import RegisterModal from "./Register";

function Header() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const history = useHistory();

  const handleLogin = () => setLogin(true);
  const handleRegister = () => setRegister(true);

  console.log(history.location.pathname)
  return (
    <div>
      {(() => {
        if (history.location.pathname === "/") {
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
                  <input className="input-header" />
                  <button className="btn-header">Search</button>
                </div>
              </div>
            </header>
          );
        } else if (history !== "/") {
          return (
            <div>
              {" "}
              <nav className="nav">
                <section className="icon">
                  <img src={Icon} />
                </section>
                <section className="group-login">
                  <button className="nav-login">Login</button>
                  <button className="nav-register">Register </button>
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
