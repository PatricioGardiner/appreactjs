import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    setCarrito((productosActuales) => {
      const productoExiste = productosActuales.find(
        (item) => item.id === producto.id
      );

      if (productoExiste) {
        return productosActuales.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...productosActuales, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarProducto = (id) => {
    setCarrito((productosActuales) =>
      productosActuales.filter((item) => item.id !== id)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalProductos = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );
