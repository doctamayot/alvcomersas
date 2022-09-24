import type { NextPage } from "next";

import CookieConsent from "react-cookie-consent";
import { Historia, Principal } from "../components/principal";
import { PrincipalLayout } from "../components/layouts";

import { Box } from "@mui/material";

const Home: NextPage = () => {
  return (
    <PrincipalLayout
      title="Alvcomer sas"
      description="Alvcomer productos militares y otros"
    >
      <Principal />
      <Historia />
      <Box></Box>
      <CookieConsent
        location="bottom"
        buttonText="Acepto la política"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
        overlay
      >
        Esta aplicación web usa Cookies para una mejor experiencia de usuario.
        <a
          href="static/images/politica.pdf"
          target="_blank"
          download="HugoTamayo"
          style={{ color: "#fff" }}
        >
          <span> </span>Ver política de tratamiento de datos
        </a>
      </CookieConsent>
    </PrincipalLayout>
  );
};

export default Home;
