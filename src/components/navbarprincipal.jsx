import { Container, Nav, Navbar, Button, Badge } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBook, FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";

import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

const NavbarPrincipal = () => {
  const { totalProductos } = useCarrito();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <FaBook className="me-2" />
          Tienda de libros
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-principal" />

        <Navbar.Collapse id="navbar-principal">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/carrito">
              <FaShoppingCart className="me-1" />
              Carrito{" "}
              <Badge bg="success" aria-label="Cantidad de productos en carrito">
                {totalProductos}
              </Badge>
            </Nav.Link>

            {usuario ? (
              <>
                <Nav.Link as={NavLink} to="/perfil">
                  <FaUser className="me-1" />
                  Perfil
                </Nav.Link>

                <Nav.Link as={NavLink} to="/admin">
                  Admin
                </Nav.Link>

                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="ms-lg-2"
                >
                  <FaSignOutAlt className="me-1" />
                  Salir
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={NavLink} to="/registro">
                  Registro
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPrincipal;
