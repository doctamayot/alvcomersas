import Image from "next/image";
import {
  NextPage,
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import { IBlog } from "../../interfaces";
import { dbBlog } from "../../database";
import { PrincipalLayout } from "../../components/layouts";
import { Grid, Box, Typography, Button, Chip } from "@mui/material";
import { ProductSlideshow } from "../../components/productos/ProductSlideshow";
import moment from "moment";
import "moment/locale/es";

interface Props {
  products: any;
  titulo: string;
}

moment.locale("es");

interface Props {
  product: IBlog;
}

const ProductoSlug: NextPage<Props> = ({ product }) => {
  return (
    <PrincipalLayout title={product.titulo} description={product.copy}>
      <Grid
        container
        spacing={6}
        marginTop={0}
        sx={{ backgroundColor: "#d8d3c4", height: { md: "100vh" } }}
      >
        <Grid item md={1} sx={{ display: { xs: "none", md: "flex" } }}></Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            marginTop: { md: "150px", xs: "100px" },
            textAlign: "center",
          }}
        >
          <Image
            src={product.images[0]}
            alt="imagen blog"
            width={500}
            height={500}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ marginTop: { md: "180px" } }}>
          <Box display="flex" flexDirection="column">
            {/* titulos */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: "40px",
                fontWeight: "bolder",
                color: "#3d3939",
                textAlign: { xs: "center", md: "start" },
                lineHeight: "40px",
              }}
              fontFamily="Roboto Condensed, sans-serif"
            >
              {product.titulo}
            </Typography>

            {/* Descripción */}
            <Box sx={{ mt: 1, textAlign: { xs: "center", md: "start" } }}>
              <Typography
                variant="body2"
                sx={{
                  marginTop: "10px",
                  fontWeight: "100",
                  fontSize: { lg: "20px" },
                }}
                fontFamily="Roboto Condensed, sans-serif"
              >
                {product.copy}
              </Typography>
            </Box>
            <Box sx={{ mt: 1, textAlign: { xs: "center", md: "start" } }}>
              <Typography
                variant="body2"
                sx={{
                  marginTop: "10px",
                  fontWeight: "100",
                  fontSize: { lg: "20px" },
                }}
                fontFamily="Roboto Condensed, sans-serif"
              >
                Publicado el {moment(product.createdAt).format("LLL")}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </PrincipalLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbBlog.getAllProductSlugs();

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
  const product = await dbBlog.getProductBySlug(slug);

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
