import { FC } from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";

import { PrincipalLayout } from "../../../components/layouts";
import { IInventory } from "../../../interfaces/inventory";
import { dbInventory } from "../../../database";

import { Inventory, Part } from "../../../models";

import PartsTable from "../../../components/inventory/PartsTable";
import MovProdTable from "../../../components/inventory/MovProdTable";

interface Props {
  product: IInventory;
  part: IInventory;
  idver: string;
}

const InvProductAdminPage: FC<Props> = ({ product, part, idver }) => {
  //const partes = data.partes;
  // console.log(product);

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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbInventory.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ _id }) => ({
      params: {
        _id: _id.toString(),
      },
    })),
    fallback: true,
  };
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { _id = "" } = params as { _id: string };

  let product: IInventory | null;
  let part: IInventory | null;
  if (_id === "new") {
    // crear un producto
    const tempProduct = JSON.parse(JSON.stringify(new Inventory()));
    delete tempProduct._id;
    tempProduct.images = ["img1.jpg"];
    tempProduct.categoria = "";
    product = tempProduct;
  } else {
    product = await dbInventory.getProductBySlug(_id.toString());
  }

  if (!product) {
    return {
      redirect: {
        destination: "/admin/invproducts",
        permanent: false,
      },
    };
  }

  const tempPart = JSON.parse(JSON.stringify(new Part()));
  delete tempPart._id;
  tempPart.images = [];

  part = tempPart;

  const idver = _id;

  return {
    props: {
      product,
      idver,
      part,
    },
    revalidate: 20,
  };
};

export default InvProductAdminPage;
