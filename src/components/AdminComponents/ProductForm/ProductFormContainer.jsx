import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/ValidateProduct";
import { uploadImage } from "../../../services/UploadImage";
import { createProduct, getProductById, updateProduct } from "../../../services/ProductsService";
import "./ProductFormContainer.css";
import { notifyAsync } from "../../../utils/Notifications";

export const ProductFormContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(isEditing);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then((productToEdit) => {
        if (!productToEdit) {
          setErrors({ general: "No se encontró el producto." });
          return;
        }

        setProduct({
          name: productToEdit.name,
          price: productToEdit.price,
          category: productToEdit.category,
          description: productToEdit.description,
        });
        setExistingImage(productToEdit.image || "");
      })
      .catch((error) => setErrors({ general: error.message }))
      .finally(() => setLoadingProduct(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //modificamos los estados para el "loading mientras se procesa"
    setErrors({});
    setLoading(true);

    //validar inputs
    const newErrors = validateProduct({ ...product, file: file || existingImage });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const saveProduct = async () => {
        const imageUrl = file ? await uploadImage(file) : existingImage;
        const productData = {
          ...product,
          category: product.category.trim(),
          price: Number(product.price),
          image: imageUrl,
        };

        if (isEditing) {
          await updateProduct(id, productData);
          navigate("/admin", { replace: true });
          return;
        }

        const newId = await createProduct(productData);
        setProduct({ name: "", price: "", category: "", description: "" });
        setFile(null);
        navigate(`/admin/products/success/${newId}`, { replace: true });
      };

      await notifyAsync(saveProduct(), {
        pending: isEditing ? "Guardando cambios..." : "Creando producto...",
        success: isEditing ? "Producto actualizado correctamente" : "Producto creado correctamente",
        error: isEditing ? "No se pudo actualizar el producto" : "No se pudo crear el producto",
      });
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductFormUI
      product={product}
      errors={errors}
      loading={loading}
      loadingProduct={loadingProduct}
      isEditing={isEditing}
      existingImage={existingImage}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
};
