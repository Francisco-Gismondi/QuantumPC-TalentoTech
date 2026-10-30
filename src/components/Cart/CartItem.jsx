import { useCart } from "../../context/CartContext";
import { confirmAction } from "../../utils/Notifications";

export const CartItem = ({ item }) => {
  const { addItem, removeItem, deleteItem } = useCart();
  const quantity = item.quantity ?? 1;

  const handleDeleteItem = async () => {
    const confirmed = await confirmAction(`¿Seguro que querés quitar ${item.name} del carrito?`, "Quitar");

    if (confirmed) {
      deleteItem(item.id);
    }
  };

  return (
    <article className="cart-item glass glass-card">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-info">
        <h2>{item.name}</h2>
        <p className="cart-item-description">{item.description}</p>
        <div className="cart-item-quantity">
          <button type="button" className="cart-quantity-button" aria-label={`Restar una unidad de ${item.name}`} onClick={() => removeItem(item.id)}>
            -
          </button>
          <span>Cantidad: {quantity} </span>
          <button type="button" className="cart-quantity-button" aria-label={`Sumar una unidad de ${item.name}`} onClick={() => addItem(item)}>
            +
          </button>
        </div>
      </div>
      <div className="cart-item-pricing">
        <p>${item.price} c/u</p>
        <strong>${item.price * quantity}</strong>
        <div>
          <button type="button" className="btn bg-delete cart-remove-button" onClick={handleDeleteItem}>
            Quitar
          </button>
        </div>
      </div>
    </article>
  );
};
