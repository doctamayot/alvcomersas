import { PrincipalLayout } from "../../../components/layouts";
import { ProductosLista } from "../../../components/productos";
import { Loading } from "../../../components/ui";
import { useProducts } from "../../../hooks";

const Inst = () => {
  const { products, isLoading } = useProducts(
    "/products?categoria=Institucional"
  );

  const titulo = "Institucional";
  const desc =
    "Elementos para la dotación y funcionamiento de entidades públicas o privadas en el área de alimentación, señalización e identificación.";
  return (
    <PrincipalLayout
      title="Institucional"
      description="Productos Institucional"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ProductosLista products={products} titulo={titulo} desc={desc} />
      )}
    </PrincipalLayout>
  );
};

export default Inst;
