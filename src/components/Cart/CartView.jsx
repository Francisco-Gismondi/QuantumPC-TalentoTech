import { useCart } from "../../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";
import "./Cart.css";

export const Cart = () => {
  const { cart, getTotalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <h1>El carrito está vacío</h1>
        <p className="empty-cart-copy">Todavía no agregaste productos. Explorá nuestro catálogo y encontrá tu próximo equipo.</p>
        <Link to="/" className="btn bg-primary cart-shop-button">
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-heading">
        <div>
          <p className="cart-kicker">Tu selección</p>
          <h1>Carrito de compras</h1>
        </div>
        <span className="cart-count">
          {getTotalItems()} {getTotalItems() === 1 ? "producto" : "productos"}
        </span>
      </div>
      <div className="cart-layout">
        <CartList />
        <CartSummary />
      </div>
    </div>
  );
};
