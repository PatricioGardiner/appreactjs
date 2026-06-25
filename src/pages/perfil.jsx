import { Card } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FaUser } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Perfil = () => {
  const { usuario } = useAuth();

  return (
    <>
      <Helmet>
        <title>Perfil | Tienda de libros</title>
        <meta
          name="description"
          content="Perfil privado del usuario autenticado."
        />
      </Helmet>

      <h1 className="mb-4">
        <FaUser className="me-2" />
        Perfil
      </h1>

      <Card>
        <Card.Body>
          <h2 className="h5">Información del usuario</h2>
          <p className="mb-0">
            <strong>Email:</strong> {usuario?.email}
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Perfil;
