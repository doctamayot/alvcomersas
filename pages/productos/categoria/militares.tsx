import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const Militares = () => {
  const { products, isLoading } = useProducts(
    "/products?categoria=Equipo+Militar+o+Camping"
  );

  const titulo = "Equipo Militar o Camping";
  const desc =
    "Accesorios indispensables en actividades recreativas, educativas o militares, para el buen desempeño del personal en los diferentes roles que desarrollen en los terrenos abiertos.";
  return (
    <PrincipalLayout
      title="Equipo Militar o Camping"
      description="Productos Equipo Militar o Camping"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ProductosLista products={products} titulo={titulo} desc={desc} />
      )}
    </PrincipalLayout>
  );
};

export default Militares;
