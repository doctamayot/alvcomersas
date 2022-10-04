import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import NextLink from "next/link";
import moment from "moment";
import "moment/locale/es";

interface Props {
  products: any;
  titulo: string;
}

moment.locale("es");

export const BlogTable: FC<Props> = ({ products, titulo }) => {
  return (
    <>
      <Box sx={{ marginTop: "150px", padding: "20px", textAlign: "center" }}>
        <Typography
          fontFamily="Roboto Condensed, sans-serif"
          fontWeight="bold"
          variant="h1"
          sx={{ fontSize: "60px" }}
        >
          Nuestro Blog
        </Typography>
      </Box>
      <Grid container sx={{ height: "100vh", padding: "20px" }} display="flex">
        {products.map(
          (
            blog: {
              _id: React.Key | null | undefined;
              titulo: string;
              copy: string;
              images: string[];
              slug: string;
              createdAt: any;
            },
            index: React.Key | null | undefined
          ) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <Card sx={{ maxWidth: 345, marginLeft: "20px" }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog.images[0]}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      fontFamily="Roboto Condensed, sans-serif"
                      fontWeight="bold"
                      sx={{ fontSize: "20px" }}
                      noWrap
                    >
                      {blog.titulo}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily="Roboto Condensed, sans-serif"
                      noWrap
                    >
                      {blog.copy}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontFamily="Roboto Condensed, sans-serif"
                      fontWeight="bold"
                      sx={{ fontSize: "12px", marginTop: "10px" }}
                      noWrap
                    >
                      Publicado el {moment(blog.createdAt).format("LL")}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <NextLink
                    href={`/blog/${blog.slug}`}
                    passHref
                    prefetch={false}
                  >
                    <Button
                      sx={{
                        color: "#fff",
                        width: "100%",
                        backgroundColor: "#0a0a0a",
                      }}
                    >
                      Leer ...
                    </Button>
                  </NextLink>
                </CardActions>
              </Card>
            </Grid>
          )
        )}
      </Grid>
    </>
  );
};
