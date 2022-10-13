import { Box } from "@mui/material";
import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const Servicios = () => {
  const { products, isLoading } = useProducts(
    "/products?categoria=Servicio de Troquelado y Embutido"
  );

  const titulo = "Servicio de Troquelado y Embutido";
  const desc = "Prestamos servicio de embutido y de troquelado";
  return (
    <PrincipalLayout
      title="Servicio de Troquelado y Embutido"
      description="Servicio de Troquelado y Embutido"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={{ backgroundColor: "#e37222" }}>
          <ProductosLista products={products} titulo={titulo} desc={desc} />
        </Box>
      )}
    </PrincipalLayout>
  );
};

export default Servicios;
