import Icon from "../assets/Icon.png";

function Navbar() {
  return (
    <div>
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

export default Navbar;
