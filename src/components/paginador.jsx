import { Pagination } from "react-bootstrap";

const Paginador = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  if (totalPaginas <= 1) return null;

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev
        disabled={paginaActual === 1}
        onClick={() => cambiarPagina(paginaActual - 1)}
      />

      {Array.from({ length: totalPaginas }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={paginaActual === index + 1}
          onClick={() => cambiarPagina(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        disabled={paginaActual === totalPaginas}
        onClick={() => cambiarPagina(paginaActual + 1)}
      />
    </Pagination>
  );
};

export default Paginador;
