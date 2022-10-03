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
  const mensaje = `https://api.whatsapp.com/send?phone=573138270226&text=Hola%20quiero%20comprar%20el%20producto%20${product.titulo}`;
  return (
    <PrincipalLayout title={product.titulo} description={product.copy}>
      <Grid
        container
        spacing={6}
        marginTop={0}
        sx={{ backgroundColor: "#fec526" }}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            marginTop: { md: "200px", xs: "50px" },
            marginLeft: { lg: "100px" },
          }}
        >
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{ marginTop: { md: "250px" }, marginLeft: { lg: "4px" } }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* titulos */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "40px",
                fontWeight: "bolder",
                color: "#fff",
                textAlign: "center",
                lineHeight: "40px",
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
            <Box sx={{ mt: 1 }} textAlign="center">
              <Typography
                variant="subtitle2"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "30px",
                  fontWeight: "bolder",
                  color: "#fff",
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
                  fontSize: { lg: "20px" },
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
                  marginBottom: { xs: "30px" },
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
