import { Item } from "../Item/Item";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";

export const ItemDetail = ({ item }) => {
  const { addItem } = useCart();

  return (
    <div className="detail-wrapper">
      <Item {...item}>
        <button className="btn btn-primary primary" onClick={() => addItem(item)}>
          Agregar al carrito
        </button>
      </Item>
    </div>
  );
};
