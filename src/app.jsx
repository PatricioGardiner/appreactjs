import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";
import AdminProductos from "./pages/AdminProductos";
import RutaPrivada from "./routes/RutaPrivada";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route
          path="/perfil"
          element={
            <RutaPrivada>
              <Perfil />
            </RutaPrivada>
          }
        />

        <Route
          path="/admin"
          element={
            <RutaPrivada>
              <AdminProductos />
            </RutaPrivada>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
