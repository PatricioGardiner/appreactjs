import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SpinnerCarga from "../components/SpinnerCarga";

const RutaPrivada = ({ children }) => {
  const { usuario, cargandoUsuario } = useAuth();

  if (cargandoUsuario) {
    return <SpinnerCarga texto="Verificando usuario..." />;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
};  
