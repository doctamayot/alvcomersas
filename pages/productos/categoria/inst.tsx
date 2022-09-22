import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const Inst = () => {
  const { products, isLoading } = useProducts(
    "/products?categoria=Institucional"
  );

  const titulo = "Institucional";
  return (
    <PrincipalLayout
      title="Institucional"
      description="Productos Institucional"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ProductosLista products={products} titulo={titulo} />
      )}
    </PrincipalLayout>
  );
};

export default Inst;
