      {!error && productosFiltrados.length === 0 && (
        <Alert variant="warning">
          No se encontraron productos para la búsqueda realizada.
        </Alert>
      )}

      <Row className="g-4">
        {productosPaginados.map((producto) => (
          <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
            <ProductoCard producto={producto} />
          </Col>
        ))}
      </Row>

      <Paginador
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        cambiarPagina={setPaginaActual}
      />
    </>
  );
};

export default Home;
