import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

export const Cart = () => {
  const { cart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <h1>El carrito está vacío</h1>
        <p className="empty-cart-copy">
          Todavía no agregaste productos. Explorá nuestro catálogo y encontrá tu próximo equipo.
        </p>
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
          {cart.length} {cart.length === 1 ? "producto" : "productos"}
        </span>
      </div>

      <div className="cart-layout">
        <section className="cart-products" aria-label="Productos del carrito">
          {cart.map((item) => (
            <article key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p className="cart-item-description">{item.description}</p>
              </div>
              <div className="cart-item-pricing">
                <strong>${item.price}</strong>
              </div>
            </article>
          ))}
        </section>

        <aside className="cart-summary">
          <p className="cart-kicker">Resumen del pedido</p>
          <div className="summary-row">
            <span>Productos</span>
            <span>{cart.length}</span>
          </div>
          <div className="summary-total">
            <span>Total a pagar</span>
            <strong>${getCartTotal()}</strong>
          </div>
          <button onClick={clearCart} className="btn bg-delete cart-clear-button">
            Vaciar carrito
          </button>
          <Link to="/" className="cart-continue-link">
            Seguir comprando
          </Link>
        </aside>
      </div>
    </div>
  );
};
