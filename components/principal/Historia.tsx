import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import foto from "../../assets/principal.jpg";

export const Historia = () => {
  return (
    <div id="historia">
      <Typography
        variant="h2"
        sx={{
          marginTop: { xs: "50px", xl: "100px" },
          fontSize: "35px",
          textAlign: "center",
        }}
      >
        ALVCOMER S.A.S.
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ marginTop: "0px" }}
        //direction={{ xs: "column-reverse", md: "row" }}
      >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: "40px 20px 0 20px",
              marginTop: { md: "150px", xl: "20px" },
            }}
          >
            <Image
              src="https://res.cloudinary.com/alvcomer/image/upload/v1664329017/principal_mdid63.webp"
              alt="hugp"
              width={5431}
              height={3052}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              marginTop: "20px",
              textAlign: "justify",
              padding: "20px",
              fontSize: { md: "15px", lg: "20px" },
            }}
          >
            ALVCOMER S.A.S. es una empresa familiar cuyo enfoque desde sus
            inicios ha sido la metalmecánica tuvo sus inicios en los años 80, su
            fundador fue el señor Hortelio Alvarez Rodríguez que junto con su
            esposa Guillermina Medina Rojas iniciaron la empresa fabricando de
            manera artesanal piezas en acero inoxidable como bandejas, charoles,
            platos y juegos de cubiertos.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              textAlign: "justify",
              padding: "20px",
              fontSize: { md: "15px", lg: "20px" },
            }}
          >
            Para inicios de los 90 logran adquirir sus primeras maquinas
            industriales lo que les permite a cortar los tiempos de producción y
            lograr satisfacer la demanda de ese momento, su primer traspié viene
            con la apertura económica ya que los hábitos de consumo de los
            colombianos sufren un cambio especialmente en las nuevas
            generaciones razón por la cual los productos con los que inicia en
            la empresa se encuentran en desuso y no les es posible competir en
            precios con los productos traídos de otros países.
          </Typography>

          <Typography
            sx={{
              marginTop: "10px",
              textAlign: "justify",
              padding: "20px",
              fontSize: { md: "15px", lg: "20px" },
            }}
          >
            Para el año 2000 ven una nueva oportunidad de negocio como
            proveedores del estado especialmente de las Fuerzas Militares de
            Colombia, durante esta década actúan en calidad de proveedores para
            dichas fuerzas con productos en acero inoxidable como menaje,
            marmitas. Para el año 2010 se crea una nueva línea de negocio cuyo
            nombre es herrajes cuyo fin es proveer a fabricantes textiles.
            <br /> En el año 2020 fallece su fundador, sus hijos toman la
            decisión de continuar con el legado de su padre, así como expandir
            las diferentes líneas de negocio.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
