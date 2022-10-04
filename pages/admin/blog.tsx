import NextLink from "next/link";
import { AddOutlined } from "@mui/icons-material";
import { Box, Button, CardMedia, Grid, Link } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useSWR from "swr";

import { PrincipalLayout } from "../../components/layouts";
import { IBlog } from "../../interfaces";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",

    renderCell: ({ row }: any) => {
      return (
        <a href={`/blog/${row.slug}`} target="_blank" rel="noreferrer">
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
    flex: 1,
    renderCell: ({ row }: any) => {
      return (
        <NextLink href={`/admin/blog/${row.slug}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "creado", headerName: "Creado", flex: 1 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IBlog[]>("/api/admin/blog");
  moment.locale("es");

  if (!data && !error) return <></>;

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.titulo,
    creado: moment(product.createdAt).format("LLL"),
    slug: product.slug,
  }));

  return (
    <PrincipalLayout
      title={`Blogs (${data?.length})`}
      description={"Mantenimiento de Blog"}
      // icon={ <CategoryOutlined /> }
    >
      <Box sx={{ marginTop: "150px" }}>
        <Box display="flex" justifyContent="end" sx={{ mb: 2, mr: 6 }}>
          <Button
            startIcon={<AddOutlined />}
            sx={{ color: "#fff", backgroundColor: "#2255c4" }}
            href="/admin/blog/new"
          >
            Crear Publicacíon
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
