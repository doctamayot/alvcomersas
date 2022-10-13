import { Box } from "@mui/material";
import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const titulo = "Herrajes";
const desc =
  "Los herrajes son una línea de insumos para la confección, son usados principalmente para la fabricación de morrales, bolsos, maletas, hamacas, carpas, entre otros..). , los herrajes metálicos se caracterizan por que se les puede dar diferente tipo de acabado (pavonado, niquelado, cromado, entre otros..).Los herrajes son muy importantes a la hora de hacer cualquier producto en nylon, cuero, cuerina, polipiel o parecidos, ya que éstos son los que le dan funcionalidad y carácter al producto y lo hacen ver mucho más profesional.";

const Herrajes = () => {
  const { products, isLoading } = useProducts("/products?categoria=Herrajes");

  return (
    <PrincipalLayout title="Herrajes" description="Productos herrajes">
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={{ backgroundColor: "#B0C4DE " }}>
          <ProductosLista products={products} titulo={titulo} desc={desc} />
        </Box>
      )}
    </PrincipalLayout>
  );
};

export default Herrajes;
