import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Buscador = ({ busqueda, setBusqueda }) => {
  return (
    <Form.Group className="mb-4" controlId="busqueda">
      <Form.Label>
        <FaSearch className="me-2" />
        Buscar productos
      </Form.Label>

      <Form.Control
        type="text"
        placeholder="Buscar por nombre, autor o categoría..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </Form.Group>
  );
};

export default Buscador;
