import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const Herrajes = () => {
  const { products, isLoading } = useProducts("/products?categoria=Herrajes");

  const titulo = "Herrajes";

  console.log(products);
  return (
    <PrincipalLayout title="Herrajes" description="Productos herrajes">
      {isLoading ? (
        <Loading />
      ) : (
        <ProductosLista products={products} titulo={titulo} />
      )}
    </PrincipalLayout>
  );
};

export default Herrajes;
