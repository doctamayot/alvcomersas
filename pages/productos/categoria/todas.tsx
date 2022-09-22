import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const Todas = () => {
  const { products, isLoading } = useProducts("/products");

  const titulo = "Todos";
  return (
    <PrincipalLayout title="Todos" description="Todos los productos">
      {isLoading ? (
        <Loading />
      ) : (
        <ProductosLista products={products} titulo={titulo} />
      )}
    </PrincipalLayout>
  );
};

export default Todas;
