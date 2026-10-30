import { useCart } from "../../context/CartContext";
import { CartItem } from "./CartItem";

export const CartList = () => {
  const { cart } = useCart();

  return (
    <section className="cart-products" aria-label="Productos del carrito">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </section>
  );
};
