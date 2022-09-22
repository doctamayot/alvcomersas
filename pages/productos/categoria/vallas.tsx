import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const Vallas = () => {
  const { products, isLoading } = useProducts(
    "/products?categoria=Vallas de Contención"
  );
  const titulo = "Vallas de Contención";
  return (
    <PrincipalLayout
      title="Vallas de Contención"
      description="Vallas de Contención"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ProductosLista products={products} titulo={titulo} />
      )}
    </PrincipalLayout>
  );
};

export default Vallas;
