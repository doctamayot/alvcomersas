import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
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
import { dbProducts } from "../../../database";
import { tesloApi } from "../../../axios";
import Product from "../../../models/Product";

const validCategories = [
  "Equipo Militar o Camping",
  "Herrajes",
  "Institucional",
  "Servicio de Troquelado y Embutido",
  "Botas Multiproposito",
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
  const [newTagValue, setNewTagValue] = useState("");
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

  const onNewTag = () => {
    const newTag = newTagValue.trim().toLocaleLowerCase();
    setNewTagValue("");
    const currentTags = getValues("tags");

    if (currentTags.includes(newTag)) {
      return;
    }

    currentTags.push(newTag);
  };

  const onDeleteTag = (tag: string) => {
    const updatedTags = getValues("tags").filter((t) => t !== tag);
    setValue("tags", updatedTags, { shouldValidate: true });
  };

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
    if (form.images.length < 2) return alert("M??nimo 2 imagenes");
    setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: "/admin/products",
        method: form._id ? "PUT" : "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });
      await Swal.fire({
        title: form._id ? "Producto Editado" : "Producto Creado",
        text: "Continuar",
        icon: "success",
        confirmButtonText: "Ok",
      });
      await router.push("/admin/products");

      if (!form._id) {
        router.replace(`/admin/products/${form.slug}`);
      } else {
        setIsSaving(false);
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
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
            url: "/admin/products",
            method: "DELETE",
            data: product,
          });
        } catch (error) {
          console.log(error);
          setIsSaving(false);
        }

        Swal.fire("Borrado!", "El producto fue borrado", "success");
        router.push("/admin/products");
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
                label="T??tulo"
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                {...register("titulo", {
                  required: "Este campo es requerido",
                  minLength: { value: 2, message: "M??nimo 2 caracteres" },
                })}
                error={!!errors.titulo}
                helperText={errors.titulo?.message}
              />

              <TextField
                label="Descripci??n"
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

              <TextField
                label="Precio"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                {...register("precio", {
                  required: "Este campo es requerido",
                  min: { value: 0, message: "M??nimo de valor cero" },
                })}
                error={!!errors.precio}
                helperText={errors.precio?.message}
              />

              <Divider sx={{ my: 1 }} />

              <FormControl sx={{ mb: 1 }}>
                <FormLabel>Categor??a</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="categoria"
                  value={getValues("categoria")}
                  onChange={({ target }) =>
                    setValue("categoria", target.value, {
                      shouldValidate: true,
                    })
                  }
                >
                  {validCategories.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio color="secondary" />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Tags e imagenes */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Slug - URL"
                variant="outlined"
                fullWidth
                sx={{ mb: 1, visibility: "hidden" }}
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

              <TextField
                label="Etiquetas"
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                helperText="Presiona [spacebar] para agregar"
                value={newTagValue}
                onChange={({ target }) => setNewTagValue(target.value)}
                onKeyUp={({ code }) =>
                  code === "Space" ? onNewTag() : undefined
                }
              />

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  listStyle: "none",
                  p: 0,
                  m: 0,
                }}
                component="ul"
              >
                {getValues("tags").map((tag) => {
                  return (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => onDeleteTag(tag)}
                      color="primary"
                      size="small"
                      sx={{ ml: 1, mt: 1 }}
                    />
                  );
                })}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" flexDirection="column">
                <FormLabel sx={{ mb: 1 }}>Im??genes</FormLabel>
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
                  label="Es necesario al menos 2 imagenes"
                  color="error"
                  variant="outlined"
                  sx={{
                    display: getValues("images").length < 2 ? "flex" : "none",
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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };

  let product: IProducto | null;

  if (slug === "new") {
    // crear un producto
    const tempProduct = JSON.parse(JSON.stringify(new Product()));
    delete tempProduct._id;
    tempProduct.images = [];
    tempProduct.categoria = "";
    tempProduct.nuevo = "nuevo";
    product = tempProduct;
  } else {
    product = await dbProducts.getProductBySlug(slug.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
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
