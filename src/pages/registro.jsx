import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { registrar } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Debes completar todos los campos.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setError("");
      setCargando(true);

      await registrar(email, password);
      navigate("/perfil");
    } catch (error) {
      setError("No se pudo registrar el usuario.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Registro | Tienda de libros</title>
        <meta
          name="description"
          content="Registro de usuarios para la tienda de libros."
        />
      </Helmet>

      <Card className="mx-auto" style={{ maxWidth: "480px" }}>
        <Card.Body>
          <h1 className="h3 mb-4">Crear cuenta</h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="emailRegistro">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="usuario@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="passwordRegistro">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="success" disabled={cargando}>
              <FaUserPlus className="me-2" />
              {cargando ? "Creando cuenta..." : "Registrarme"}
            </Button>
          </Form>

          <p className="mt-3 mb-0">
            ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
          </p>
        </Card.Body>
      </Card>
    </>
  );
};

export default Registro;
