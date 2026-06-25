import { Spinner } from "react-bootstrap";

const SpinnerCarga = ({ texto = "Cargando..." }) => {
  return (
    <div className="text-center my-5">
      <Spinner animation="border" role="status" />
      <p className="mt-3">{texto}</p>
    </div>
  );
};

export default SpinnerCarga;
