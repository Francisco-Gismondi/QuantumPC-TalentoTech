import { useCart } from "../../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { confirmAction } from "../../utils/Notifications";

export const CartSummary = () => {
  const { clearCart, getCartTotal, getTotalItems, checkout } = useCart();

  const handleClearCart = async () => {
    const confirmed = await confirmAction("¿Seguro que querés vaciar el carrito?", "Vaciar");

    if (confirmed) {
      clearCart();
    }
  };
  return (
    <aside className="cart-summary glass glass-panel">
      <p className="cart-kicker">Resumen del pedido</p>
      <div className="summary-row">
        <span>Productos</span>
        <span>{getTotalItems()}</span>
      </div>
      <div className="summary-total">
        <span>Total a pagar</span>
        <strong>${getCartTotal()}</strong>
      </div>
      <button onClick={checkout} className="btn bg-primary cart-clear-button">
        Realizar Compra
      </button>
      <button type="button" onClick={handleClearCart} className="btn bg-delete cart-clear-button">
        Vaciar carrito
      </button>
      <Link to="/" className="cart-continue-link">
        Seguir comprando
      </Link>
    </aside>
  );
};
