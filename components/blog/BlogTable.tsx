import {
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

interface Props {
  products: any;
  titulo: string;
}

export const BlogTable: FC<Props> = ({ products, titulo }) => {
  console.log(products);

  return (
    <Grid
      container
      sx={{ marginTop: "200px", height: "100vh", padding: "20px" }}
      display="flex"
    >
      {products.map(
        (blog: {
          _id: React.Key | null | undefined;
          titulo: string;
          copy: string;
          images: string[];
          slug: string;
        }) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={blog._id}>
            <Card sx={{ maxWidth: 345, marginLeft: "20px" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.images[0]}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {blog.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.copy}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <NextLink href={`/blog/${blog.slug}`} passHref prefetch={false}>
                  <Button sx={{ color: "#000" }}>Leer ...</Button>
                </NextLink>
              </CardActions>
            </Card>
          </Grid>
        )
      )}
    </Grid>
  );
};
