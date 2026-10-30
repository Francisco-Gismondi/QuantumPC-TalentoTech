import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { Cart } from "./components/Cart/CartView";
import { Login } from "./components/Login/Login";
import { Dashboard } from "./components/AdminComponents/Dashboard/Dashboard";
import { ProductFormContainer } from "./components/AdminComponents/ProductForm/ProductFormContainer";
import { ProductSuccess } from "./components/AdminComponents/ProuctSuccess";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<ItemListContainer />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:id" element={<ItemDetailContainer />} />
        <Route path="category/:category" element={<ItemListContainer />} />
      </Route>

      <Route path="admin/login" element={<Login />} />
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products/new" element={<ProductFormContainer />} />
        <Route path="products/edit/:id" element={<ProductFormContainer />} />
        <Route path="products/success/:id" element={<ProductSuccess />} />
      </Route>
    </Routes>
  );
}

export default App;
