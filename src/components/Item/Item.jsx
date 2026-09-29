import "./Item.css";

export const Item = ({ image, name, description, price, children }) => {
  return (
    <article className="card">
      <img src={image} />
      <h3>{name}</h3>
      <p>{description}</p>
      <p>${price}</p>
      {children}
    </article>
  );
};
