import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Nav.css";
import { useCart } from "../../context/CartContext";

export const Nav = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/category/notebook"}>Notebooks</Link>
        </li>
        <li>
          <Link to={"/category/gamer"}>Gamers</Link>
        </li>
        <li>
          <Link to={"/category/desktop"}>Desktop</Link>
        </li>
        <li>
          <Link to={"/cart"}>
            <FontAwesomeIcon icon={faCartShopping} />
            {totalItems > 0 && <span className="incar">{totalItems}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
