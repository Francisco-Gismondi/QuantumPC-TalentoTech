import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import { useState } from "react";
import { notifyAsync } from "../../utils/Notifications";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await notifyAsync(
        login(formData.email, formData.password).then(() => navigate("/admin", { replace: true })),
        {
          pending: "Iniciando sesión...",
          success: "Sesión iniciada correctamente",
          error: "No se pudo iniciar sesión",
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar sesión</h2>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" placeholder="Correo electronico" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
      </div>

      <button className="btn bg-primary" type="submit">
        Ingresar
      </button>
    </form>
  );
};
