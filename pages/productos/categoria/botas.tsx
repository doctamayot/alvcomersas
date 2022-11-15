import { Box } from "@mui/material";
import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const titulo = "Botas Multipropósito";
const desc = "Botas Multipropósito";

const Botas = () => {
  const { products, isLoading } = useProducts(
    "/products?categoria=Botas Multiproposito"
  );

  return (
    <PrincipalLayout
      title="Botas Multipropósito"
      description="Botas Multipropósito"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={{ backgroundColor: "#e9b721 " }}>
          <ProductosLista products={products} titulo={titulo} desc={desc} />
        </Box>
      )}
    </PrincipalLayout>
  );
};

export default Botas;
