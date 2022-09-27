import NextLink from "next/link";
import {
  AddOutlined,
  CategoryOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Chip,
  Divider,
  FormLabel,
  Grid,
  Link,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import useSWR from "swr";
import clsx from "clsx";

import { PrincipalLayout } from "../../components/layouts";
import { IInventory } from "../../interfaces/inventory";
import { IProducto } from "../../interfaces/productos";
import { errors } from "formidable";
import { useState, useRef, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { tesloApi } from "../../axios";
import { useRouter } from "next/router";
import { Product } from "../../models";

interface FormData {
  _id?: string;
  copy: string;
  images: string[];
  cantidad: number;
  titulo: string;
}

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
    flex: 1,
    renderCell: ({ row }: any) => {
      return (
        <NextLink href={`/admin/invproducts/${row.id}`} passHref>
          <Link underline="always">{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: "copy", headerName: "Descripción", flex: 1 },
  {
    field: "cantidad",
    headerName: "Stock",
    flex: 1,
    cellClassName: (params: GridCellParams<number>) => {
      if (params.value == null) {
        return "";
      }

      return clsx("super-app", {
        alarm: params.value < 500,
        // positive: params.value > 100,
      });
    },
  },
];

const InvProductsPage = () => {
  const { data, error } = useSWR<IInventory[]>("/api/admin/inventory");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const Swal = require("sweetalert2");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const product = {
    copy: "",
    images: [],
    precio: 0,

    categoria: "",
    titulo: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({ defaultValues: product });

  const onFilesSelected = async ({ target }: any) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      console.log(target.files);
      for (const file of target.files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await tesloApi.post<{ message: string }>(
          "/admin/upload",
          formData
        );
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const onDeleteImage = (image: string) => {
    setValue(
      "images",
      getValues("images").filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 1) return alert("Mínimo 1 imagen");
    //setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: `/admin/inventory`,
        method: "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });
      setOpen(false);
      Swal.fire({
        title: "Producto Inventario Creado",
        text: "Continuar",
        icon: "success",
        confirmButtonText: "Ok",
      });
      await router.reload();

      console.log({ data });
    } catch (error) {
      console.log(error);
      //setIsSaving(false);
    }
  };

  if (!data && !error) return <></>;

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.titulo,
    copy: product.copy,
    cantidad: product.cantidad,
  }));

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PrincipalLayout
      title={`Productos (${data?.length})`}
      description={"Mantenimiento de productos"}
      // icon={ <CategoryOutlined /> }
    >
      <Box sx={{ marginTop: "150px" }}>
        <Box display="flex" justifyContent="center" sx={{ mb: 2, mr: 6 }}>
          <Button
            startIcon={<AddOutlined />}
            onClick={handleOpen}
            sx={{ color: "#fff", backgroundColor: "#2255c4" }}
          >
            Crear producto
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 1000,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    //display: idver === "new" ? "none" : "flex",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      mb: 1,
                      marginTop: "10px",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "40px",
                    }}
                  >
                    Crear Componente
                  </Typography>
                </Box>

                <Grid
                  container
                  spacing={2}
                  display="flex"
                  justifyContent="center"
                  sx={{
                    mb: 1,
                    marginTop: "10px",
                    //display: idver === "new" ? "none" : "flex",
                  }}
                >
                  {/* Data */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Título"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("titulo", {
                        required: "Este campo es requerido",
                        minLength: { value: 2, message: "Mínimo 2 caracteres" },
                      })}
                      error={!!errors.titulo}
                      helperText={errors.titulo?.message}
                    />

                    <TextField
                      label="Descripción"
                      variant="outlined"
                      fullWidth
                      multiline
                      sx={{ mb: 1 }}
                      {...register("copy", {
                        required: "Este campo es requerido",
                      })}
                      error={!!errors.copy}
                      helperText={errors.copy?.message}
                    />

                    <TextField
                      label="Cantidad"
                      type="number"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register("cantidad", {
                        required: "Este campo es requerido",
                        min: { value: 0, message: "Mínimo de valor cero" },
                      })}
                      error={!!errors.cantidad}
                      helperText={errors.cantidad?.message}
                    />

                    <Divider sx={{ my: 1 }} />
                  </Grid>

                  {/* Tags e imagenes */}
                  <Grid item xs={12} sm={6}>
                    <Divider sx={{ my: 2 }} />

                    <Box display="flex" flexDirection="column">
                      <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                      <Button
                        color="secondary"
                        fullWidth
                        startIcon={<UploadOutlined />}
                        sx={{
                          mb: 3,
                          color: "#fff",
                          backgroundColor: "#327222",
                        }}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Cargar imagen
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/png, image/gif, image/jpeg"
                        style={{ display: "none" }}
                        onChange={onFilesSelected}
                      />

                      <Chip
                        label="Es necesario al menos 1 imagen"
                        color="error"
                        variant="outlined"
                        sx={{
                          display:
                            getValues("images").length < 1 ? "flex" : "none",
                        }}
                      />

                      <Grid container spacing={2}>
                        {getValues("images").map((img) => (
                          <Grid item xs={4} sm={3} key={img}>
                            <Card>
                              <CardMedia
                                component="img"
                                className="fadeIn"
                                image={img}
                                alt={img}
                              />
                              <CardActions>
                                <Button
                                  fullWidth
                                  color="error"
                                  onClick={() => onDeleteImage(img)}
                                >
                                  Borrar
                                </Button>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  display="flex"
                  justifyContent="center"
                  sx={{ mb: 1, marginTop: "20px" }}
                >
                  <Button
                    color="secondary"
                    startIcon={<SaveOutlined />}
                    sx={{
                      width: "30%",
                      backgroundColor: "#2255c4",
                      color: "#fff",
                    }}
                    type="submit"
                    //disabled={isSaving}
                  >
                    Crear Producto
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>
        </Box>

        <Grid
          container
          className="fadeIn"
          display="flex"
          justifyContent="center"
        >
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography
              sx={{
                marginTop: "30px",
                fontSize: "30px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Producto Terminado
            </Typography>
          </Grid>
          <Grid item xs={8} sx={{ height: "650px" }}>
            <Box
              sx={{
                height: "650px",

                "& .super-app.alarm": {
                  backgroundColor: "#d47483",
                  color: "#ffffff",
                  fontWeight: "600",
                },
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PrincipalLayout>
  );
};

export default InvProductsPage;
