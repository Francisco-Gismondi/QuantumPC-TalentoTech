import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/quantumLogo.png";
import "./Header.css";

export const Header = () => {
  return (
    <header className="glass glass-nav">
      <div className="logo-container">
        <Link to={"/"}>
          <img src={logo} alt="logo quantum" />
          <span>Quantum PC</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
};
