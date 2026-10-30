import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { getProducts } from "../../services/ProductsService";

export const ItemListContainer = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => setErrors(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div class="loader-container">
        <div class="spinner">
          <div class="spinner1"></div>
        </div>
      </div>
    );
  if (errors) return <p>{errors}</p>;

  const filteredProducts = category
    ? products.filter((product) => product.category?.trim().toLocaleLowerCase("es") === decodeURIComponent(category).trim().toLocaleLowerCase("es"))
    : products;

  return (
    <section>
      <h1>{category ? `Productos: ${category}` : "Productos"}</h1>
      <ItemList products={filteredProducts} />
    </section>
  );
};
