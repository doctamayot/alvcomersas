import NextLink from "next/link";
import {
  AddOutlined,
  DeleteForeverOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { FC, useState } from "react";

import { useForm } from "react-hook-form";

import { tesloApi } from "../../axios";
import { useRouter } from "next/router";

import moment from "moment";
import "moment/locale/es";

interface FormData {
  _id?: string;
  valor: number;
  tipo: string;
  titulo: string;
}

const columns: GridColDef[] = [
  { field: "title", headerName: "Titulo", flex: 1 },
  { field: "tipo", headerName: "Tipo", flex: 1 },
  { field: "valor", headerName: "Valor", flex: 1 },
  { field: "creado", headerName: "Creado", flex: 1.3 },
];

interface Props {
  product: any;
  idver: any;
  parte: string;
}

const MovTable: FC<Props> = ({ product, idver, parte }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const Swal = require("sweetalert2");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: {} });

  if (!product) return <></>;

  //console.log(product.movimientos);
  moment.locale("es");
  const rows = product!.movimientos.map(
    (product: {
      _id: any;

      titulo: any;
      tipo: any;
      valor: any;
      createdAt: any;
    }) => ({
      id: product._id,

      title: product.titulo,
      tipo: product.tipo,
      valor: product.valor,
      creado: moment(product.createdAt).format("LLL"),
    })
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (form: FormData) => {
    //setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: `/admin/part/${idver}`,
        method: "POST",
        data: form,
      });

      console.log({ data });
      setOpen(false);
      await Swal.fire({
        title: "Movimiento Ingresado",
        text: "Continuar",
        icon: "success",
        confirmButtonText: "Ok",
      });
      await router.push(`/admin/parts/${idver}`);
    } catch (error) {
      console.log(error);
      //setIsSaving(false);
    }
  };

  const onDeleteComponent = async () => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "Esto borra el componente para siempre",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrarlo!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const { data } = await tesloApi({
            url: `/admin/parts`,
            method: "DELETE",
            data: product,
          });
        } catch (error) {
          console.log(error);
          setIsSaving(false);
        }

        Swal.fire("Borrado!", "El componente fue borrado", "success");
        router.back();
      }
    });
  };

  return (
    <>
      <Box sx={{ marginTop: "150px" }}>
        <Box display="flex" justifyContent="center" sx={{ marginTop: "150px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="220"
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

        <Box display="flex" justifyContent="center" sx={{ mb: 2, mt: 2 }}>
          <Button
            startIcon={<DeleteForeverOutlined />}
            sx={{
              width: "200px",
              backgroundColor: "#9b0f0f",
              color: "#fff",
              marginLeft: "5px",
            }}
            onClick={() => onDeleteComponent()}
            disabled={isSaving}
          >
            Borrar Componente
          </Button>
          <Button
            startIcon={<AddOutlined />}
            color="secondary"
            onClick={handleOpen}
            sx={{
              width: "200px",
              backgroundColor: "#2255c4",
              color: "#fff",
              marginLeft: "10px",
            }}
          >
            Crear Movimiento
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
                width: { xs: 300, md: 900 },
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
                      fontSize: "20px",
                    }}
                  >
                    Crear Movimiento
                  </Typography>
                </Box>

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
                  label="Cantidad"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 1 }}
                  {...register("valor", {
                    required: "Este campo es requerido",
                    min: { value: 0, message: "Mínimo de valor cero" },
                  })}
                  error={!!errors.valor}
                  helperText={errors.valor?.message}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue=""
                    label="Tipo"
                    //onChange={handleChange}
                    {...register("tipo", {
                      required: "Este campo es requerido",
                    })}
                  >
                    <MenuItem value={"entrada"}>entrada</MenuItem>
                    <MenuItem value={"salida"}>salida</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  startIcon={<SaveOutlined />}
                  sx={{
                    width: "100%",
                    backgroundColor: "#2255c4",
                    color: "#fff",
                    marginTop: "10px",
                  }}
                  type="submit"
                  //disabled={isSaving}
                >
                  Insertar Movimiento
                </Button>
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
              Movimientos
            </Typography>
          </Grid>

          <Grid item xs={8} sx={{ height: "650px" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              sx={{
                width: "85%",
                margin: "0 auto",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MovTable;
