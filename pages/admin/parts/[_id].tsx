import { FC } from "react";
import { GetServerSideProps } from "next";

import { useForm } from "react-hook-form";

import { PrincipalLayout } from "../../../components/layouts";
import { IInventory } from "../../../interfaces/inventory";
import { dbInventory } from "../../../database";

import { Movimiento } from "../../../models";

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
