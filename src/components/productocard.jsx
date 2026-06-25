   <div className="p-3">
        <TituloProducto>{producto.nombre}</TituloProducto>

        {producto.autor && <p className="text-muted mb-1">{producto.autor}</p>}

        <p>{producto.descripcion}</p>

        <PrecioProducto>${producto.precio}</PrecioProducto>

        <Button
          variant="success"
          className="w-100"
          onClick={() => agregarProducto(producto)}
        >
          <FaShoppingCart className="me-2" />
          Agregar al carrito
        </Button>
      </div>
    </CardProductoStyled>
  );
};

export default ProductoCard;
