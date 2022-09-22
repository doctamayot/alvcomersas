import NextLink from "next/link";
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useSWR from "swr";

import { PrincipalLayout } from "../../components/layouts";
import { IProducto } from "../../interfaces/productos";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: any) => {
      return (
        <a href={`/productos/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component="img"
            alt={row.title}
            className="fadeIn"
            image={row.img}
            sx={{ padding: "20px" }}
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Titulo",
    width: 200,
    renderCell: ({ row }: any) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "categoria", headerName: "Categoria", width: 250 },
  { field: "price", headerName: "Precio" },
  { field: "copy", headerName: "Descripción", width: 400 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProducto[]>("/api/admin/products");

  if (!data && !error) return <></>;

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.titulo,
    categoria: product.categoria,
    price: product.precio,
    copy: product.copy,
    slug: product.slug,
  }));

  return (
    <PrincipalLayout
      title={`Productos (${data?.length})`}
      description={"Mantenimiento de productos"}
      // icon={ <CategoryOutlined /> }
    >
      <Box sx={{ marginTop: "150px" }}>
        <Box display="flex" justifyContent="end" sx={{ mb: 2, mr: 6 }}>
          <Button
            startIcon={<AddOutlined />}
            color="secondary"
            href="/admin/products/new"
          >
            Crear producto
          </Button>
        </Box>

        <Grid
          container
          className="fadeIn"
          display="flex"
          justifyContent="center"
        >
          <Grid item xs={8} sx={{ height: "650px" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </Grid>
        </Grid>
      </Box>
    </PrincipalLayout>
  );
};

export default ProductsPage;
