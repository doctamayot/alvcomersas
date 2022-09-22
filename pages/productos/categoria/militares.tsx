import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const Militares = () => {
  const { products, isLoading } = useProducts(
    "/products?categoria=Equipo+Militar+o+Camping"
  );

  const titulo = "Equipo Militar o Camping";
  return (
    <PrincipalLayout
      title="Equipo Militar o Camping"
      description="Productos Equipo Militar o Camping"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ProductosLista products={products} titulo={titulo} />
      )}
    </PrincipalLayout>
  );
};

export default Militares;
