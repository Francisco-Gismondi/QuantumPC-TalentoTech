import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
export const ProductFormUI = ({ product, errors, loading, loadingProduct, isEditing, existingImage, onChange, onFileChange, onSubmit }) => {
  return (
    <section>
      <header>
        <h2>Panel de administración</h2>
        <button className="btn btn-secondary" onClick={() => window.history.back()}>
          <FontAwesomeIcon icon={faLeftLong} />
          Volver
        </button>
      </header>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>{isEditing ? "Modificar producto" : "Agregar nuevo producto"}</h2>

        {loadingProduct && <p>Cargando producto...</p>}

        <div>
          <label>Nombre:</label>
          <input type="text" name="name" value={product.name} onChange={onChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" name="price" value={product.price} onChange={onChange} min="0" />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        <div>
          <label>Categoría:</label>
          <input type="text" name="category" value={product.category} onChange={onChange} />
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div>
          <label>Descripción:</label>
          <textarea name="description" value={product.description} onChange={onChange} />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label>Imagen:</label>
          {isEditing && existingImage && <img src={existingImage} alt="Imagen actual del producto" />}
          <input type="file" accept="image/*" onChange={onFileChange} />
          {isEditing && <small>Si no seleccionás otra imagen, se conservará la actual.</small>}
          {errors.file && <p className="error">{errors.file}</p>}
        </div>

        <button className="btn bg-primary" type="submit" disabled={loading || loadingProduct}>
          {loading ? (isEditing ? "Guardando cambios..." : "Guardando...") : (isEditing ? "Guardar cambios" : "Guardar")}
        </button>

        {errors.general && <p className="error">{errors.general}</p>}
      </form>
    </section>
  );
};
