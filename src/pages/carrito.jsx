import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FaTrash } from "react-icons/fa";

import { useCarrito } from "../context/CarritoContext";

const Carrito = () => {
  const { carrito, eliminarProducto, vaciarCarrito, totalPrecio } = useCarrito();

  return (
    <>
      <Helmet>
        <title>Carrito | Tienda de libros</title>
        <meta
          name="description"
          content="Carrito de compras de la tienda de libros."
        />
      </Helmet>

      <h1 className="mb-4">Carrito de compras</h1>

      {carrito.length === 0 ? (
        <Alert variant="info">El carrito está vacío.</Alert>
      ) : (
        <>
          <Row className="g-3">
            {carrito.map((item) => (
              <Col xs={12} key={item.id}>
                <Card>
                  <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <div>
                      <h2 className="h5 mb-1">{item.nombre}</h2>
                      <p className="mb-1">Cantidad: {item.cantidad}</p>
                      <p className="mb-0">
                        Precio unitario: ${item.precio} - Subtotal: $
                        {item.precio * item.cantidad}
                      </p>
                    </div>

                    <Button
                      variant="danger"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      <FaTrash className="me-2" />
                      Eliminar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="mt-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <h2>Total: ${totalPrecio}</h2>

            <Button variant="outline-danger" onClick={vaciarCarrito}>
              Vaciar carrito
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Carrito;
