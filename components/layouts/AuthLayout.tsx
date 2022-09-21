import { FC } from "react";
import Head from "next/head";
import { MenuLateral } from "../ui";
import { Box } from "@mui/material";

interface Props {
  title: string;
  children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <MenuLateral />
      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {children}
        </Box>
      </main>
    </>
  );
};
