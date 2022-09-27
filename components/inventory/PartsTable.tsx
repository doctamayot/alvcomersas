import NextLink from "next/link";
import {
  AddOutlined,
  CategoryOutlined,
  DeleteForeverOutlined,
  EditAttributes,
  EditOffOutlined,
  EditOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
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

import { PrincipalLayout } from "../../components/layouts";
import { IInventory } from "../../interfaces/inventory";
import { ChangeEvent, FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { tesloApi } from "../../axios";
import { useRouter } from "next/router";
import clsx from "clsx";

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
        <div
        //   href={`/admin/invproducts/${row.id}`}
        //   target="_blank"
        //   rel="noreferrer"
        >
          <CardMedia
            component="img"
            alt={row.title}
            className="fadeIn"
            image={row.img}
            sx={{ padding: "20px" }}
          />
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Titulo",
    flex: 1,
    renderCell: ({ row }: any) => {
      return (
        <NextLink href={`/admin/parts/${row.id}`} passHref>
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

interface Props {
  product: any;
  part: any;
  idver: any;
}

const PartsTable: FC<Props> = ({ product, part, idver }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const router = useRouter();

  const Swal = require("sweetalert2");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({
    defaultValues: part,
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    getValues: getValues2,
    setValue: setValue2,
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: product,
  });

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || target.files.length === 0) {
      return;
    }

    try {
      //console.log(target.files);
      for (const file of target.files as any) {
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

  const onFilesSelected2 = async ({ target }: any) => {
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
        setValue2("images", [...getValues2("images"), data.message], {
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

  const onDeleteImage2 = (image: string) => {
    setValue2(
      "images",
      getValues2("images").filter((img) => img !== image),
      { shouldValidate: true }
    );
  };

  const onSubmitPart = async (form: FormData) => {
    if (form.images.length < 1) return alert("Mínimo 1 imagen");
    setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: `/admin/inventory/${product._id}`,
        method: "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });
      setOpen(false);
      Swal.fire({
        title: "Componente Creado",
        text: "Continuar",
        icon: "success",
        confirmButtonText: "Ok",
      });

      console.log({ data });
      router.push(`/admin/invproducts/${idver}`);
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 1) return alert("Mínimo 1 imagen");
    setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: `/admin/inventory`,
        method: form._id ? "PUT" : "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });
      setOpen2(false);
      Swal.fire({
        title: form._id ? "Producto Editado" : "Producto Creado",
        text: "Continuar",
        icon: "success",
        confirmButtonText: "Ok",
      });
      router.push(`/admin/invproducts/${idver}`);
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  if (!product.partes) return <></>;

  const rows = product.partes!.map(
    (product: {
      _id: any;
      images: any[];
      titulo: any;
      copy: any;
      cantidad: any;
    }) => ({
      id: product._id,
      img: product.images[0],
      title: product.titulo,
      copy: product.copy,
      cantidad: product.cantidad,
    })
  );
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const onDeleteProduct = async () => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "Esto borra el producto para siempre",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrarlo!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const { data } = await tesloApi({
            url: "/admin/inventory",
            method: "DELETE",
            data: product,
          });
        } catch (error) {
          console.log(error);
          setIsSaving(false);
        }

        Swal.fire("Borrado!", "El producto fue borrado", "success");
        router.push("/admin/invproducts");
      }
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="center" sx={{ marginTop: "150px" }}>
        <Card sx={{ maxWidth: 400 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100%"
              image={product.images[0]}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.copy}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="#3e6ac9"
                sx={{ marginTop: "10px" }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="span"
                  color="#000000"
                  sx={{ marginTop: "10px" }}
                >
                  Stock:
                </Typography>
                {product.cantidad}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
          <Button
            startIcon={<EditOutlined />}
            color="secondary"
            onClick={handleOpen2}
            sx={{ width: "200px", backgroundColor: "#9da71a", color: "#fff" }}
          >
            Editar Producto
          </Button>
          <Modal
            open={open2}
            onClose={handleClose2}
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
              <form onSubmit={handleSubmit2(onSubmit)}>
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
                    Editar Producto
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
                      {...register2("titulo", {
                        required: "Este campo es requerido",
                        minLength: {
                          value: 2,
                          message: "Mínimo 2 caracteres",
                        },
                      })}
                      error={!!errors2.titulo}
                      helperText={errors2.titulo?.message}
                    />

                    <TextField
                      label="Descripción"
                      variant="outlined"
                      fullWidth
                      multiline
                      sx={{ mb: 1 }}
                      {...register2("copy", {
                        required: "Este campo es requerido",
                      })}
                      error={!!errors2.copy}
                      helperText={errors2.copy?.message}
                    />

                    <TextField
                      label="Cantidad"
                      type="number"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 1 }}
                      {...register2("cantidad", {
                        required: "Este campo es requerido",
                        min: { value: 0, message: "Mínimo de valor cero" },
                      })}
                      error={!!errors2.cantidad}
                      helperText={errors2.cantidad?.message}
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
                        onChange={onFilesSelected2}
                      />

                      <Chip
                        label="Es necesario al menos 1 imagen"
                        color="error"
                        variant="outlined"
                        sx={{
                          display:
                            getValues2("images").length < 1 ? "flex" : "none",
                        }}
                      />

                      <Grid container spacing={2}>
                        {getValues2("images").map((img) => (
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
                                  onClick={() => onDeleteImage2(img)}
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
                    Editar
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>

          <Button
            startIcon={<DeleteForeverOutlined />}
            sx={{
              width: "200px",
              backgroundColor: "#9b0f0f",
              color: "#fff",
              marginLeft: "5px",
            }}
            onClick={() => onDeleteProduct()}
            //disabled={isSaving}
          >
            Borrar Producto
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ mb: 0, mt: 6 }}>
          <Button
            startIcon={<AddOutlined />}
            color="secondary"
            onClick={handleOpen}
            sx={{ width: "200px", backgroundColor: "#2255c4", color: "#fff" }}
          >
            Crear Componente
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
              <form onSubmit={handleSubmit(onSubmitPart)}>
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
                        onClick={() => fileInputRef2.current?.click()}
                        sx={{
                          mb: 3,
                          color: "#fff",
                          backgroundColor: "#327222",
                        }}
                      >
                        Cargar imagen
                      </Button>
                      <input
                        ref={fileInputRef2}
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
                    Crear Parte
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
              Componentes de {product.titulo}
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
      {/* <MovProdTable product={product} idver={idver} /> */}
    </>
  );
};

export default PartsTable;
