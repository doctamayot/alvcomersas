import type { NextPage } from "next";

import foto from "../assets/pulidora.jpg";

import { useSession } from "next-auth/react";

import { Historia, Principal } from "../components/principal";
import { PrincipalLayout } from "../components/layouts";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <PrincipalLayout
      title="Alvcomer ecommerce"
      description="Alvcomer productos militares y otros"
    >
      <Principal />
      <Historia />
    </PrincipalLayout>
  );
};

export default Home;
