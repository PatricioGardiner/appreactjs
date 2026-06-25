import { Button, Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const ModalConfirmacion = ({
  mostrar,
  cerrarModal,
  confirmar,
  titulo = "Confirmar acción",
  mensaje = "¿Seguro que quieres continuar?",
}) => {
  return (
    <Modal show={mostrar} onHide={cerrarModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{mensaje}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModal}>
          Cancelar
        </Button>

        <Button variant="danger" onClick={confirmar}>
          <FaTrash className="me-2" />
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmacion;
