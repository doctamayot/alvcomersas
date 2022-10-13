import { Box } from "@mui/material";
import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const titulo = "Todos";
const desc =
  "Accesorios indispensables en actividades recreativas, educativas o militares, para el buen desempeño del personal en los diferentes roles que desarrollen en los terrenos abiertos. Herrajes, productos Institucionales, y servicios de embutido y troquelado";

const Todas = () => {
  const { products, isLoading } = useProducts("/products");

  return (
    <PrincipalLayout title="Todos" description="Todos los productos">
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={{ backgroundColor: "#e9b721" }}>
          <ProductosLista products={products} titulo={titulo} desc={desc} />
        </Box>
      )}
    </PrincipalLayout>
  );
};

export default Todas;
