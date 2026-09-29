import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faSquareFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer>
      <h3>Seguinos en</h3>
      <nav className="nav-list">
        <li>
          <a>
            <FontAwesomeIcon icon={faWhatsapp} />
            Whatsapp
          </a>
        </li>
        <li>
          <a>
            <FontAwesomeIcon icon={faInstagram} />
            Instagram
          </a>
        </li>
        <li>
          <a>
            <FontAwesomeIcon icon={faSquareFacebook} />
            Facebook
          </a>
        </li>
      </nav>
    </footer>
  );
};
