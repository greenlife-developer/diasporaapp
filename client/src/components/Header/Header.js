import logo from "../../assets/images/logo.png";
import "./header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          <a href="/" style={{ width: "100%", height: "100%" }}>
            <img width="100%" height="100%" src={logo} />
          </a>
        </div>
        <div className="nav-items">
          <ul>
            <li className="actions">
              <a href="#">Login</a>
            </li>
            <li className="actions reg">
              <a href="#register">Register</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
