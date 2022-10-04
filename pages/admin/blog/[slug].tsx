import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";

import { PrincipalLayout } from "../../../components/layouts";
import { IProducto } from "../../../interfaces/productos";
import { dbBlog, dbProducts } from "../../../database";
import { tesloApi } from "../../../axios";
import Product from "../../../models/Product";
import { IBlog } from "../../../interfaces";

const validCategories = [
  "Equipo Militar o Camping",
  "Herrajes",
  "Institucional",
  "Servicio de Troquelado y Embutido",
];

interface FormData {
  _id?: string;
  copy: string;
  images: string[];
  precio: number;
  slug: string;
  tags: string[];
  titulo: string;
  categoria: string;
}

interface Props {
  product: IProducto;
}

const ProductAdminPage: FC<Props> = ({ product }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSaving, setIsSaving] = useState(false);
  const Swal = require("sweetalert2");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "titulo") {
        const newSlug =
          value.titulo
            ?.trim()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
            .toLocaleLowerCase() || "";

        setValue("slug", newSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

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
    setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: "/admin/blog",
        method: form._id ? "PUT" : "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });
      await Swal.fire({
        title: form._id ? "Blog Editado" : "Blog Creado",
        text: "Continuar",
        icon: "success",
        confirmButtonText: "Ok",
      });
      await router.push("/admin/blog");

      if (!form._id) {
        router.replace(`/admin/blog`);
      } else {
        setIsSaving(false);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      setIsSaving(false);
      await Swal.fire({
        title: error.response.data.message,
        text: "Continuar",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const onDeleteProduct = async () => {
    Swal.fire({
      title: "Estas Seguro?",
      text: "Esto borra el blog para siempre",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrarlo!",
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        try {
          const { data } = await tesloApi({
            url: "/admin/blog",
            method: "DELETE",
            data: product,
          });
        } catch (error) {
          console.log(error);
          setIsSaving(false);
        }

        Swal.fire("Borrado!", "El blog fue borrado", "success");
        router.push("/admin/blog");
      }
    });
  };

  return (
    <PrincipalLayout
      title={"Producto"}
      description={`Editando: ${product.titulo}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ padding: "20px" }}>
          <Box
            display="flex"
            justifyContent="end"
            sx={{ mb: 1, marginTop: "150px", padding: "20px" }}
          >
            <Button
              startIcon={<SaveOutlined />}
              sx={{ width: "150px", backgroundColor: "#2255c4", color: "#fff" }}
              type="submit"
              disabled={isSaving}
            >
              Guardar
            </Button>
            {product.nuevo != "nuevo" ? (
              <Button
                startIcon={<DeleteForeverOutlined />}
                sx={{
                  width: "150px",
                  backgroundColor: "#9b0f0f",
                  color: "#fff",
                  marginLeft: "5px",
                }}
                onClick={() => onDeleteProduct()}
                disabled={isSaving}
              >
                Borrar
              </Button>
            ) : null}
          </Box>

          <Grid container spacing={2}>
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
                rows={4}
              />
            </Grid>

            {/* Tags e imagenes */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Slug - URL"
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                {...register("slug", {
                  required: "Este campo es requerido",
                  validate: (val) =>
                    val.trim().includes(" ")
                      ? "No puede tener espacios en blanco"
                      : undefined,
                })}
                error={!!errors.slug}
                helperText={errors.slug?.message}
              />

              <Divider sx={{ my: 2 }} />

              <Box display="flex" flexDirection="column">
                <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                <Button
                  fullWidth
                  startIcon={<UploadOutlined />}
                  sx={{ mb: 3, color: "#fff", backgroundColor: "#327222" }}
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
                    display: getValues("images").length < 1 ? "flex" : "none",
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
        </Box>
      </form>
    </PrincipalLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;

  let product: IBlog | null;

  if (slug === "new") {
    // crear un producto
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = [];
    tempProduct.categoria = "";
    tempProduct.nuevo = "nuevo";
    product = tempProduct;
  } else {
    product = await dbBlog.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/blog",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
