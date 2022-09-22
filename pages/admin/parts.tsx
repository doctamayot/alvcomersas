import NextLink from "next/link";
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import useSWR from "swr";

import { PrincipalLayout } from "../../components/layouts";
import { IInventory } from "../../interfaces/inventory";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: any) => {
      return (
        <a
          href={`/admin/invproducts/${row.id}`}
          target="_blank"
          rel="noreferrer"
        >
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
    width: 400,
    renderCell: ({ row }: any) => {
      return (
        <NextLink href={`/admin/invproducts/${row.id}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "copy", headerName: "Descripción", width: 500 },
  { field: "cantidad", headerName: "Stock", width: 200 },
];

const PartsPage = () => {
  const { data, error } = useSWR<IInventory[]>("/api/admin/inventory");

  if (!data && !error) return <></>;

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.titulo,
    copy: product.copy,
    cantidad: product.cantidad,
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
            href="/admin/invproducts/new"
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

export default PartsPage;
