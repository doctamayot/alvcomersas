import type { NextPage, GetServerSideProps } from "next";
import { PrincipalLayout } from "../../components/layouts";
import { ProductosLista } from "../../components/productos";
import { Loading } from "../../components/ui";
import { useProducts } from "../../hooks";

import { dbProducts } from "../../database";
import { IProducto } from "../../interfaces/productos";
import { Box, Typography } from "@mui/material";

interface Props {
  products: IProducto[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  const titulo = "Busqueda:";
  const desc =
    "Para el producto que estas buscando nuestra plataforma encontró los siguientes Productos: Estos son los productos según la busqueda";
  return (
    <PrincipalLayout
      title="Busqueda productos"
      description="Busqueda de productos "
    >
      {foundProducts ? (
        <Box
          sx={{
            backgroundColor: "#d8d3c4",
            display: "flex",
            justifyContent: "center",
            marginBottom: { md: "-100px" },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "40px",
              fontWeight: "bolder",
              color: "#fff",
              marginTop: "130px",
            }}
          >
            Búsqueda:
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "40px",
              fontWeight: "bolder",
              color: "#000",
              marginTop: "130px",
              marginLeft: "10px",
            }}
            color="secondary"
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "#d8d3c4",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Roboto condensed, sans-serif",
              fontSize: "40px",
              fontWeight: "bolder",
              color: "#fff",
              paddingTop: "100px",
            }}
          >
            No encontramos ningún produto:
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "40px",
              fontWeight: "bolder",
              color: "#000",
              marginTop: "30px",
              marginLeft: "10px",
            }}
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      )}

      <ProductosLista products={products} titulo={titulo} desc={desc} />
    </PrincipalLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  // y no hay productos
  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  // TODO: retornar otros productos
  if (!foundProducts) {
    // products = await dbProducts.getAllProducts();
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
