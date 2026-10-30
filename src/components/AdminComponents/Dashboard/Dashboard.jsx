import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCircleUp, faLeftLong, faUserXmark } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import { useAuth } from "../../../context/AuthContext";
import { deleteProduct, getProducts } from "../../../services/ProductsService";
import { confirmAction, notifyAsync } from "../../../utils/Notifications";

export const Dashboard = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const hasSelectedProduct = Boolean(selectedProductId);

  const handleDeleteProduct = async () => {
    if (!selectedProductId) return;

    const confirmed = await confirmAction("¿Seguro que querés eliminar este producto?");
    if (!confirmed) return;

    try {
      setDeleting(true);
      setError(null);
      await notifyAsync(deleteProduct(selectedProductId), {
        pending: "Eliminando producto...",
        success: "Producto eliminado correctamente",
        error: "No se pudo eliminar el producto",
      });
      setProducts((currentProducts) => currentProducts.filter((product) => product.id !== selectedProductId));
      setSelectedProductId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Panel de administración</h2>

        <div className="header-actions">
          <Link className="btn btn-secondary" to="/">
            <FontAwesomeIcon icon={faLeftLong} />
            Volver a la tienda
          </Link>
          <button className="btn bg-delete primary" onClick={logout}>
            <FontAwesomeIcon icon={faUserXmark} />
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="dashboard-actions">
        <h3>Acciones rápidas</h3>

        <div className="actions-grid">
          <Link to="/admin/products/new" className="action-card">
            <FontAwesomeIcon icon={faCircleUp} />
            Cargar
          </Link>

          <Link
            to={hasSelectedProduct ? `/admin/products/edit/${selectedProductId}` : "#"}
            className={`action-card${hasSelectedProduct ? "" : " disabled"}`}
            aria-disabled={!hasSelectedProduct}
            onClick={(event) => !hasSelectedProduct && event.preventDefault()}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            Modificar
          </Link>

          <button type="button" className="action-card action-card-delete" onClick={handleDeleteProduct} disabled={!hasSelectedProduct || deleting}>
            <FontAwesomeIcon icon={faTrash} />
            {deleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </section>
      <section className="dashboard-products">
        <h3>Productos</h3>

        {loading && (
          <div className="loader-container">
            <div className="spinner">
              <div className="spinner1"></div>
            </div>
          </div>
        )}
        {error && <p className="products-error">No se pudieron cargar los productos: {error}</p>}

        {!loading && !error && products.length === 0 && <p>No hay productos cargados.</p>}

        {!loading && !error && products.length > 0 && (
          <div className="products-list">
            {products.map((product) => {
              const isSelected = selectedProductId === product.id;

              return (
                <button
                  key={product.id}
                  type="button"
                  className={`admin-product-row${isSelected ? " selected" : ""}`}
                  onClick={() => setSelectedProductId((currentId) => (currentId === product.id ? null : product.id))}
                  aria-pressed={isSelected}
                >
                  <img className="admin-product-image" src={product.image} alt={product.name} />
                  <span className="admin-product-name">{product.name}</span>
                  <span className="admin-product-price">${Number(product.price).toLocaleString("es-AR")}</span>
                </button>
              );
            })}
          </div>
        )}
      </section>
      <section className="dashboard-help">
        <h3>Ayuda</h3>
        <p>Desde este panel podés gestionar los productos de la tienda.</p>
      </section>
    </div>
  );
};
