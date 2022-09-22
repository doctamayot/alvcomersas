import { PrincipalLayout } from "../../components/layouts";
import { ProductosLista } from "../../components/productos";
import { Loading } from "../../components/ui";
import { useProducts } from "../../hooks";

const Productos = () => {
  const { products, isLoading } = useProducts("/products");
  const titulo = "Todos";
  console.log(products);
  return (
    <PrincipalLayout
      title="Acero Inoxidable"
      description="Productos en acero inoxidable"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ProductosLista products={products} titulo={titulo} />
      )}
    </PrincipalLayout>
  );
};

export default Productos;
