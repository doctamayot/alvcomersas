import { FC } from "react";
import Head from "next/head";
import { MenuLateral, Navbar } from "../ui";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const PrincipalLayout: FC<Props> = ({
  children,
  title,
  description,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Head>
      <nav>
        <Navbar />
      </nav>

      <MenuLateral />
      <main>{children}</main>

      <footer></footer>
    </>
  );
};
