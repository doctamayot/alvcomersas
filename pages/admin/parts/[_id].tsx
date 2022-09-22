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
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AddOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material";

import { PrincipalLayout } from "../../../components/layouts";
import { IInventory } from "../../../interfaces/inventory";
import { dbInventory } from "../../../database";
import { tesloApi } from "../../../api";
import { Inventory, Movimiento, Part } from "../../../models";

import MovTable from "../../../components/inventory/MovTable";

interface FormData {
  _id?: string;
  copy: string;
  images: string[];
  cantidad: number;
  titulo: string;
}

interface Props {
  product: IInventory;
  mov: any;
  idver: string;
}

const InvPartAdminPage: FC<Props> = ({ product, idver, mov }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  //const partes = data.partes;
  // console.log(product.movimientos);

  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({
    defaultValues: product,
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    getValues: getValues2,
    setValue: setValue2,
  } = useForm<FormData>({
    mode: "onBlur",
    defaultValues: mov,
  });

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
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

  const onFilesSelected2 = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
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

  const onSubmit = async (form: FormData) => {
    if (form.images.length < 1) return alert("Mínimo 1 imagen");
    setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: "/admin/parts",
        method: form._id ? "PUT" : "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });

      console.log({ data });
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  const onSubmitMov = async (form: FormData) => {
    if (form.images.length < 1) return alert("Mínimo 1 imagen");
    setIsSaving(true);

    try {
      const { data } = await tesloApi({
        url: `/admin/part/${product._id}`,
        method: "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: form,
      });

      console.log({ data });
    } catch (error) {
      console.log(error);
      setIsSaving(false);
    }
  };

  return (
    <PrincipalLayout
      title={"Producto"}
      description={`Editando: ${product.titulo}`}
    >
      {/* {idver !== "new" ? <PartsTable product={product} /> : null} */}

      <MovTable product={product} idver={idver} parte={product.titulo} />
    </PrincipalLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { _id = "" } = query;

  let product: any | null;
  let mov: any | null;
  if (_id === "new") {
    // crear un producto
    const tempProduct = JSON.parse(JSON.stringify(new Movimiento()));
    delete tempProduct._id;

    product = tempProduct;
  } else {
    product = await dbInventory.getPartBySlug(_id.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/invproducts",
        permanent: false,
      },
    };
  }

  const tempPart = JSON.parse(JSON.stringify(new Movimiento()));
  delete tempPart._id;

  mov = tempPart;

  const idver = _id;

  return {
    props: {
      product,
      idver,
      mov,
    },
  };
};

export default InvPartAdminPage;
