import type { NextPage } from "next";

import foto from "../assets/pulidora.jpg";

import { useSession } from "next-auth/react";

import { Historia, Principal } from "../components/principal";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <>
      <Principal />
      <Historia />
    </>
  );
};

export default Home;
