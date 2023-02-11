//MUI
import { Box, CircularProgress, Typography } from "@mui/material";

//APP
import { PrincipalLayout } from "../layouts/PrincipalLayout";

export const Loading = () => {
  return (
    <PrincipalLayout title="Alvcomer SAS" description={"Alvcomer SAS"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{
          flexDirection: { xs: "column" },
        }}
        textAlign="center"
      >
        <Typography
          sx={{ fontFamily: "Montserrat, sans-serif", color: "#000000" }}
          variant="h6"
          fontSize={30}
          fontWeight="200"
        >
          Cargando....
        </Typography>
        <CircularProgress
          sx={{ marginTop: "30px", color: "#000000" }}
          thickness={2}
        />
      </Box>
    </PrincipalLayout>
  );
};
