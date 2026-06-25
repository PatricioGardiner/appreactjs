import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { FaEdit, FaPlus, FaTrash, FaDatabase } from "react-icons/fa";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";
import ModalConfirmacion from "../components/ModalConfirmacion";
import SpinnerCarga from "../components/SpinnerCarga";
import { productosIniciales } from "../data/productosIniciales";

const estadoInicialFormulario = {
  nombre: "",
  autor: "",
  precio: "",
  descripcion: "",
  categoria: "",
  imagen: "",
  stock: "",
};

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(estadoInicialFormulario);

  const [productoEditando, setProductoEditando] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const productosRef = collection(db, "productos");

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError("");

      const querySnapshot = await getDocs(productosRef);

      const data = querySnapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));

      setProductos(data);
    } catch (error) {
      setError("No se pudieron obtener los productos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validarFormulario = () => {
    if (!form.nombre.trim()) return "El nombre es obligatorio.";
    if (!form.autor.trim()) return "El autor es obligatorio.";
    if (!form.descripcion.trim()) return "La descripción es obligatoria.";
    if (!form.categoria.trim()) return "La categoría es obligatoria.";
    if (!form.imagen.trim()) return "La imagen es obligatoria.";
    if (Number(form.precio) <= 0) return "El precio debe ser mayor que 0.";
    if (Number(form.stock) < 0) return "El stock no puede ser negativo.";

    return null;
  };

  const limpiarFormulario = () => {
    setForm(estadoInicialFormulario);
    setProductoEditando(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorValidacion = validarFormulario();

    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    try {
      setCargando(true);
      setError("");
      setMensaje("");

      const producto = {
        nombre: form.nombre,
        autor: form.autor,
        precio: Number(form.precio),
        descripcion: form.descripcion,
        categoria: form.categoria,
        imagen: form.imagen,
        stock: Number(form.stock),
      };

      if (productoEditando) {
        const productoRef = doc(db, "productos", productoEditando.id);
        await updateDoc(productoRef, producto);
        setMensaje("Producto actualizado correctamente.");
      } else {
        await addDoc(productosRef, producto);
        setMensaje("Producto agregado correctamente.");
      }

      limpiarFormulario();
      await cargarProductos();
    } catch (error) {
      setError("No se pudo guardar el producto.");
    } finally {
      setCargando(false);
    }
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto);

    setForm({
      nombre: producto.nombre || "",
      autor: producto.autor || "",
      precio: producto.precio || "",
      descripcion: producto.descripcion || "",
      categoria: producto.categoria || "",
      imagen: producto.imagen || "",
      stock: producto.stock || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const abrirModalEliminar = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModal(true);
  };

  const confirmarEliminacion = async () => {
    try {
      setCargando(true);
      setError("");
      setMensaje("");

      const productoRef = doc(db, "productos", productoAEliminar.id);
      await deleteDoc(productoRef);

      setMensaje("Producto eliminado correctamente.");
      setMostrarModal(false);
      setProductoAEliminar(null);

      await cargarProductos();
    } catch (error) {
      setError("No se pudo eliminar el producto.");
    } finally {
      setCargando(false);
    }
  };

  const cargarProductosIniciales = async () => {
    try {
      setCargando(true);
      setError("");
      setMensaje("");

      for (const producto of productosIniciales) {
        await addDoc(productosRef, producto);
      }

      setMensaje("Productos iniciales cargados correctamente.");
      await cargarProductos();
    } catch (error) {
      setError("No se pudieron cargar los productos iniciales.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Administrar productos | Tienda de libros</title>
        <meta
          name="description"
          content="Panel privado para crear, editar y eliminar productos."
        />
      </Helmet>

      <h1 className="mb-4">Administración de productos</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {mensaje && <Alert variant="success">{mensaje}</Alert>}

      <Card className="mb-4">
        <Card.Body>
          <h2 className="h4 mb-3">
            {productoEditando ? "Editar producto" : "Agregar producto"}
          </h2>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ejemplo: El principito"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="autor">
                  <Form.Label>Autor</Form.Label>
                  <Form.Control
                    type="text"
                    name="autor"
                    value={form.autor}
                    onChange={handleChange}
                    placeholder="Ejemplo: Saint-Exupéry"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="precio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    placeholder="15000"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="categoria">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control
                    type="text"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    placeholder="Literatura"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3" controlId="stock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="10"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3" controlId="imagen">
                  <Form.Label>URL o ruta de imagen</Form.Label>
                  <Form.Control
                    type="text"
                    name="imagen"
                    value={form.imagen}
                    onChange={handleChange}
                    placeholder="/img/principito.jpg"
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3" controlId="descripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción del libro"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex flex-column flex-md-row gap-2">
              <Button type="submit" variant="primary" disabled={cargando}>
                <FaPlus className="me-2" />
                {productoEditando ? "Guardar cambios" : "Agregar producto"}
              </Button>

              {productoEditando && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={limpiarFormulario}
                >
                  Cancelar edición
                </Button>
              )}

              <Button
                type="button"
                variant="outline-success"
                onClick={cargarProductosIniciales}
                disabled={cargando}
              >
                <FaDatabase className="me-2" />
                Cargar productos iniciales
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {cargando && <SpinnerCarga texto="Procesando datos..." />}

      <h2 className="h4 mb-3">Listado de productos</h2>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Autor</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.autor}</td>
              <td>${producto.precio}</td>
              <td>{producto.categoria}</td>
              <td>{producto.stock}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => editarProducto(producto)}
                  >
                    <FaEdit className="me-1" />
                    Editar
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => abrirModalEliminar(producto)}
                  >
                    <FaTrash className="me-1" />
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalConfirmacion
        mostrar={mostrarModal}
        cerrarModal={() => setMostrarModal(false)}
        confirmar={confirmarEliminacion}
        titulo="Eliminar producto"
        mensaje={`¿Seguro que quieres eliminar "${productoAEliminar?.nombre}"?`}
      />
    </>
  );
};

export default AdminProductos;
