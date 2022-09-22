import NextLink from "next/link";
import {
  NextPage,
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import { IProducto } from "../../interfaces/productos";
import { dbProducts } from "../../database";
import { PrincipalLayout } from "../../components/layouts";
import { Grid, Box, Typography, Button, Chip } from "@mui/material";
import { ProductSlideshow } from "../../components/productos/ProductSlideshow";
import { ShoppingCartCheckout } from "@mui/icons-material";

interface Props {
  product: IProducto;
}

const ProductoSlug: NextPage<Props> = ({ product }) => {
  const mensaje = `https://api.whatsapp.com/send?phone=573144261190&text=Hola%20quiero%20comprar%20el%20producto%20${product.titulo}`;
  return (
    <PrincipalLayout title={product.titulo} description={product.copy}>
      <Grid
        container
        spacing={6}
        marginTop={0}
        sx={{ backgroundColor: "#fec526", height: "100vh" }}
      >
        <Grid
          item
          xs={12}
          sm={5}
          sx={{ marginTop: "200px", marginLeft: "100px" }}
        >
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          sx={{ marginTop: "250px", marginLeft: "4px" }}
        >
          <Box display="flex" flexDirection="column">
            {/* titulos */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "60px",
                fontWeight: "bolder",
                color: "#fff",

                lineHeight: "70px",
              }}
            >
              {product.titulo}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                marginTop: "10px",
                fontWeight: "100",
                fontSize: "30px",
              }}
            >{`$ ${product.precio}`}</Typography>

            {/* Descripción */}
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "40px",
                  fontWeight: "bolder",
                  color: "#fff",

                  lineHeight: "70px",
                }}
              >
                Descripción
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  marginTop: "10px",
                  fontWeight: "100",
                }}
              >
                {product.copy}
              </Typography>
            </Box>
            <a href={mensaje} target="_blank" rel="noreferrer">
              <Button
                endIcon={<ShoppingCartCheckout />}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  marginTop: "30px",
                  width: "300px",
                }}
              >
                Quiero Comprar
              </Button>
            </a>
          </Box>
        </Grid>
      </Grid>
    </PrincipalLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductoSlug;
