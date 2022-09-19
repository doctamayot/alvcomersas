import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useSession } from "next-auth/react";
import { Box, Button } from "@mui/material";
import { Principal } from "../components/principal";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  return (
    <>
      <Principal />
      <Box>Hugop</Box>
    </>
  );
};

export default Home;
