import {
  GitHub,
  LinkedIn,
  Facebook,
  Twitter,
  Instagram,
  WhatsApp,
} from "@mui/icons-material";
import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import React, { FC } from "react";
import moment from "moment";
import NextLink from "next/link";

export const Footer: FC = () => {
  const mensaje = `https://api.whatsapp.com/send?phone=573144261190&text=Hola%20buen%20dia`;
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#302c2c",
        color: "#FFF",
        padding: "10px",
      }}
      id="footer"
    >
      <Grid
        item
        xs={12}
        sm={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="20px"
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ border: "1px solid", padding: " 0 40px" }}
          >
            Secciones
          </Typography>
          <NextLink href="/#historia" passHref>
            <Link underline="none" color="#fff">
              <Typography variant="subtitle1">Alvcomer SAS</Typography>
            </Link>
          </NextLink>
          <NextLink href="/productos/categoria/todas" passHref>
            <Link underline="none" color="#fff">
              <Typography variant="subtitle1">Productos</Typography>
            </Link>
          </NextLink>
          <NextLink href="/blog" passHref>
            <Link underline="none" color="#fff">
              <Typography variant="subtitle1">Blog</Typography>
            </Link>
          </NextLink>
          <NextLink href="/#footer" passHref>
            <Link underline="none" color="#fff">
              <Typography variant="subtitle1">Encuéntranos</Typography>
            </Link>
          </NextLink>
        </Box>
        <Divider
          sx={{
            backgroundColor: "#fff",
            width: "300px",
            margin: "20px auto",
          }}
          flexItem
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>
            WebApp by Hugo Tamayo.
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="20px"
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ border: "1px solid" }}>
            Categorías
          </Typography>
          <NextLink href="/productos/categoria/todas" passHref>
            <Link underline="none" color="#fff">
              <Typography variant="subtitle1">
                Equipo Militar o Camping
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/productos/categoria/todas" passHref>
            <Link underline="none" color="#fff">
              <Typography variant="subtitle1">Herrajes</Typography>
            </Link>
          </NextLink>
          <NextLink href="/productos/categoria/todas" passHref>
            <Link underline="none" color="#fff">
              <Typography variant="subtitle1">Institucional</Typography>
            </Link>
          </NextLink>
          <NextLink href="/productos/categoria/todas" passHref>
            <Link underline="none" color="#fff">
              <Typography variant="subtitle1">
                Servicio de Troquelado y Embutido
              </Typography>
            </Link>
          </NextLink>
        </Box>
        <Divider
          sx={{
            backgroundColor: "#fff",
            width: "300px",
            margin: "20px auto",
          }}
          flexItem
        />
        <Box>
          <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>
            Copyright © {moment().format("YYYY")} Alvcomer SAS.
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="20px"
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "20px",
              padding: "0 40px",
              border: "1px solid",
            }}
          >
            Encuéntranos
          </Typography>

          <Box component="span" color="#fff">
            <a
              href="https://github.com/doctamayot/"
              rel="noreferrer"
              target="_blank"
            >
              <GitHub sx={{ color: "#fff" }} />
            </a>

            <a
              href="https://www.linkedin.com/in/hugo-tamayo-8126b791/"
              rel="noreferrer"
              target="_blank"
            >
              <LinkedIn sx={{ color: "#fff" }} />
            </a>
            <a
              href="https://www.facebook.com/hugo.tamayo/"
              rel="noreferrer"
              target="_blank"
            >
              <Facebook sx={{ color: "#fff" }} />
            </a>
            <a
              href="https://twitter.com/doctamayot"
              rel="noreferrer"
              target="_blank"
            >
              <Twitter sx={{ color: "#fff" }} />
            </a>
            <a
              href="https://www.instagram.com/doctamayot/"
              rel="noreferrer"
              target="_blank"
            >
              <Instagram sx={{ color: "#fff" }} />
            </a>
          </Box>
        </Box>
        <Typography variant="h6" component="span" color="#fff">
          <a href={mensaje} rel="noreferrer" target="_blank">
            <WhatsApp
              sx={{ color: "#129612", fontSize: "50px", marginTop: "10px" }}
            />
          </a>
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#fff",
            width: "300px",
            margin: "20px auto",
          }}
          flexItem
        />
        <Box>
          <a
            href="static/images/politica.pdf"
            target="_blank"
            download="HugoTamayo"
            style={{ color: "#fff" }}
          >
            Política de protección de datos y Cookies.
          </a>
        </Box>
      </Grid>
    </Grid>
  );
};
