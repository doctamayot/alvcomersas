import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const Placas = () => {
  const { products, isLoading } = useProducts(
    "/products?categoria=Placas de Identificación"
  );

  const titulo = "Placas de Identificación";
  return (
    <PrincipalLayout
      title="Placas de Identificación"
      description="Productos Placas de Identificación"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ProductosLista products={products} titulo={titulo} />
      )}
    </PrincipalLayout>
  );
};

export default Placas;
