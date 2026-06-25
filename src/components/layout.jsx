import { Container } from "react-bootstrap";
import NavbarPrincipal from "./NavbarPrincipal";
import { Footer, PageContainer } from "../styles/styled";

const Layout = ({ children }) => {
  return (
    <>
      <NavbarPrincipal />

      <PageContainer>
        <Container>{children}</Container>
      </PageContainer>

      <Footer>
        <p className="mb-0">Tienda de libros - Proyecto final React + Firebase</p>
      </Footer>
    </>
  );
};

export default Layout;
