import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const Servicios = () => {
  const { products, isLoading } = useProducts(
    "/products?categoria=Servicio de Troquelado y Embutido"
  );

  const titulo = "Servicio de Troquelado y Embutido";
  return (
    <PrincipalLayout
      title="Servicio de Troquelado y Embutido"
      description="Servicio de Troquelado y Embutido"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ProductosLista products={products} titulo={titulo} />
      )}
    </PrincipalLayout>
  );
};

export default Servicios;
