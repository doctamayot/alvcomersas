import { FC, useEffect, useState } from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

import { PrincipalLayout } from "../../../components/layouts";
import { IInventory } from "../../../interfaces/inventory";
import { dbInventory } from "../../../database";

import { Inventory, Part } from "../../../models";

import PartsTable from "../../../components/inventory/PartsTable";
import MovProdTable from "../../../components/inventory/MovProdTable";

import { Loading } from "../../../components/ui";
import { tesloApi } from "../../../axios";
import { useRouter } from "next/router";

interface Props {
  product: IInventory;
  part: IInventory;
  idver: string;
}

const InvProductAdminPage: FC<Props> = ({ part, idver }) => {
  const [product, setProducto] = useState<any>();
  const router = useRouter();

  //const partes = data.partes;

  const hugo = async () => {
    try {
      const { data } = await tesloApi({
        url: "/admin/serversideinvprod",
        method: "POST", // si tenemos un _id, entonces actualizar, si no crear
        data: { _id: router.query._id },
      });
      setProducto(data);
      //reset(data);
    } catch (error) {}
  };

  useEffect(() => {
    hugo();
  }, [part]);
  if (!product) return <Loading />;
  return (
    <PrincipalLayout
      title={"Producto"}
      description={`Editando: ${product.titulo}`}
    >
      <PartsTable product={product} part={part} idver={idver} />
      <MovProdTable product={product} idver={idver} />
    </PrincipalLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { _id = "" } = query;

  let product: IInventory | null;
  let part: IInventory | null;
  // if (_id === "new") {
  //   // crear un producto
  //   const tempProduct = JSON.parse(JSON.stringify(new Inventory()));
  //   delete tempProduct._id;
  //   tempProduct.images = [];
  //   tempProduct.categoria = "";
  //   product = tempProduct;
  // } else {
  //   product = await dbInventory.getProductBySlug(_id.toString());
  // }

  //   const tempProduct = JSON.parse(JSON.stringify(new Inventory()));
  //   delete tempProduct._id;
  //   tempProduct.images = [];
  //   tempProduct.categoria = "";
  //   product = tempProduct;

  // if (!product) {
  //   return {
  //     redirect: {
  //       destination: "/admin/invproducts",
  //       permanent: false,
  //     },
  //   };
  // }

  const tempPart = JSON.parse(JSON.stringify(new Part()));
  delete tempPart._id;
  tempPart.images = [];

  part = tempPart;

  const idver = _id;

  return {
    props: {
      idver,
      part,
    },
  };
};

export default InvProductAdminPage;
