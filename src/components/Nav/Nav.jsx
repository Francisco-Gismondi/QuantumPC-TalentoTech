import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./Nav.css";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/ProductsService";

export const Nav = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts()
      .then((products) => {
        const categoriesBySlug = new Map();

        products.forEach((product) => {
          const category = product.category?.trim();
          if (!category) return;

          const normalizedCategory = category.toLocaleLowerCase("es");
          if (!categoriesBySlug.has(normalizedCategory)) {
            categoriesBySlug.set(normalizedCategory, category);
          }
        });

        const uniqueCategories = [...categoriesBySlug.values()].sort((a, b) =>
          a.localeCompare(b, "es", { sensitivity: "base" })
        );

        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error al cargar categorías:", error));
  }, []);

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/category/${encodeURIComponent(category.trim().toLocaleLowerCase("es"))}`}>{category}</Link>
          </li>
        ))}
        <li>
          <Link to={"/cart"} className="nav-cart-link" aria-label="Carrito">
            <FontAwesomeIcon icon={faCartShopping} />
            {totalItems > 0 && (
              <span className="incart" key={totalItems}>
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};
