import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import React, { FC } from "react";
import moment from "moment";
import NextLink from "next/link";

export const Footer: FC = () => {
  const mensaje = `https://api.whatsapp.com/send?phone=573138270226&text=Hola%20Alvcomer!!!`;
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
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              border: "1px solid",
              padding: " 0 40px",
              fontFamily: "Roboto Condensed, sans-serif",
              fontWeight: "600",
            }}
          >
            Secciones
          </Typography>
          <NextLink href="/#historia" passHref>
            <Link underline="none" color="#fff">
              <Typography
                variant="subtitle1"
                fontFamily="Roboto Condensed, sans-serif"
              >
                Alvcomer SAS
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/productos/categoria/todas" passHref>
            <Link underline="none" color="#fff">
              <Typography
                variant="subtitle1"
                fontFamily="Roboto Condensed, sans-serif"
              >
                Productos
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/blog" passHref>
            <Link underline="none" color="#fff">
              <Typography
                variant="subtitle1"
                fontFamily="Roboto Condensed, sans-serif"
              >
                Blog
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/#footer" passHref>
            <Link underline="none" color="#fff">
              <Typography
                variant="subtitle1"
                fontFamily="Roboto Condensed, sans-serif"
              >
                Encuéntranos
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
          <Typography
            variant="h6"
            sx={{ border: "1px solid", fontWeight: "600" }}
            fontFamily="Roboto Condensed,sans-serif"
          >
            Categorías
          </Typography>
          <NextLink href="/productos/categoria/militares" passHref>
            <Link underline="none" color="#fff">
              <Typography
                variant="subtitle1"
                fontFamily="Roboto Condensed,sans-serif"
              >
                Equipo Militar o Camping
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/productos/categoria/herrajes" passHref>
            <Link underline="none" color="#fff">
              <Typography
                variant="subtitle1"
                fontFamily="Roboto Condensed,sans-serif"
              >
                Herrajes
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/productos/categoria/inst" passHref>
            <Link underline="none" color="#fff">
              <Typography
                variant="subtitle1"
                fontFamily="Roboto Condensed,sans-serif"
              >
                Institucional
              </Typography>
            </Link>
          </NextLink>
          <NextLink href="/productos/categoria/servicios" passHref>
            <Link underline="none" color="#fff">
              <Typography
                variant="subtitle1"
                fontFamily="Roboto Condensed,sans-serif"
              >
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
              marginBottom: "10px",
              padding: "0 40px",
              border: "1px solid",
            }}
            fontFamily="Roboto Condensed,sans-serif"
            fontWeight="600"
          >
            Encuéntranos
          </Typography>

          <Box component="span" color="#fff">
            <a
              href="https://www.facebook.com/Alvcomer-SAS-102592972551525"
              rel="noreferrer"
              target="_blank"
            >
              <Facebook sx={{ color: "#fff", fontSize: "40px" }} />
            </a>

            <a
              href="https://www.instagram.com/alvcomer/"
              rel="noreferrer"
              target="_blank"
            >
              <Instagram sx={{ color: "#fff", fontSize: "40px" }} />
            </a>
          </Box>
        </Box>
        <Typography variant="h6" component="span" color="#fff">
          <a href={mensaje} rel="noreferrer" target="_blank">
            <WhatsApp
              sx={{ color: "#129612", fontSize: "50px", marginTop: "1px" }}
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
