import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Debes completar todos los campos.");
      return;
    }

    try {
      setError("");
      setCargando(true);

      await login(email, password);
      navigate("/perfil");
    } catch (error) {
      setError("No se pudo iniciar sesión. Revisa tus credenciales.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Tienda de libros</title>
        <meta
          name="description"
          content="Inicio de sesión para usuarios registrados."
        />
      </Helmet>

      <Card className="mx-auto" style={{ maxWidth: "480px" }}>
        <Card.Body>
          <h1 className="h3 mb-4">Iniciar sesión</h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="usuario@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" disabled={cargando}>
              <FaSignInAlt className="me-2" />
              {cargando ? "Ingresando..." : "Ingresar"}
            </Button>
          </Form>

          <p className="mt-3 mb-0">
            ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;
