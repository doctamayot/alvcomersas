import { PrincipalLayout } from "../../components/layouts";
import { BlogTable } from "../../components/blog/BlogTable";
import { Loading } from "../../components/ui";
import { useProducts } from "../../hooks";

const Productos = () => {
  const { products, isLoading } = useProducts("/blog");
  const titulo = "Todos";

  return (
    <PrincipalLayout
      title="Blog Alvcomer"
      description="Productos en acero inoxidable"
    >
      {isLoading ? (
        <Loading />
      ) : (
        <BlogTable products={products} titulo={titulo} />
      )}
    </PrincipalLayout>
  );
};

export default Productos;
