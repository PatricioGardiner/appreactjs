import styled from "styled-components";

export const PageContainer = styled.main`
  min-height: 80vh;
  padding: 2rem 0;
`;

export const CardProductoStyled = styled.article`
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const ImagenProducto = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  background-color: #f2f2f2;
`;

export const TituloProducto = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
`;

export const PrecioProducto = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  color: #198754;
`;

export const Footer = styled.footer`
  background-color: #212529;
  color: white;
  padding: 1.5rem 0;
  margin-top: 2rem;
  text-align: center;
`;
