//react
import { useContext, useState } from "react";
//Next
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
//MUI
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  Airplay,
  Animation,
  AssuredWorkload,
  CategoryOutlined,
  LoginOutlined,
  MilitaryTech,
  PrecisionManufacturing,
  SearchOutlined,
  VpnKeyOutlined,
  WorkspacePremium,
} from "@mui/icons-material";
//APP
import { UiContext } from "../../context";

export const MenuLateral = () => {
  const router = useRouter();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState("");

  // const { data: session, status }: any = useSession();

  // console.log(status);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };
  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
              value={searchTerm}
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility">
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          <ListItem button onClick={() => navigateTo("/productos/categoria/")}>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Perfil"} />
          </ListItem>

          <ListItem
            button
            onClick={() => navigateTo("/productos/categoria/militares")}
          >
            <ListItemIcon>
              <MilitaryTech />
            </ListItemIcon>
            <ListItemText primary={"Equipo Militar o Camping"} />
          </ListItem>

          <ListItem
            button
            onClick={() => navigateTo("/productos/categoria/herrajes")}
          >
            <ListItemIcon>
              <Animation />
            </ListItemIcon>
            <ListItemText primary={"Herrajes"} />
          </ListItem>

          <ListItem
            button
            onClick={() => navigateTo("/productos/categoria/inst")}
          >
            <ListItemIcon>
              <AssuredWorkload />
            </ListItemIcon>
            <ListItemText primary={"Institucional"} />
          </ListItem>
          <ListItem
            button
            onClick={() => navigateTo("/productos/categoria/vallas")}
          >
            <ListItemIcon>
              <Airplay />
            </ListItemIcon>
            <ListItemText primary={"Vallas de Contención"} />
          </ListItem>
          <ListItem
            button
            onClick={() => navigateTo("/productos/categoria/servicios")}
          >
            <ListItemIcon>
              <PrecisionManufacturing />
            </ListItemIcon>
            <ListItemText primary={"Servicio de Troquelado y embutido"} />
          </ListItem>
          <ListItem
            button
            onClick={() => navigateTo("/productos/categoria/placas")}
          >
            <ListItemIcon>
              <WorkspacePremium />
            </ListItemIcon>
            <ListItemText primary={"Placas de Identificación"} />
          </ListItem>

          {/* {session ? (
            <ListItem button onClick={() => signOut()}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
          ) : (
            <ListItem button onClick={() => navigateTo("/auth/login")}>
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItem>
          )} */}

          {/* Admin */}
          {/* {session && session.user && session.user.role === "admin" ? (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem button onClick={() => navigateTo("/admin/products")}>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={"Productos"} />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItem>
            </>
          ) : null} */}
        </List>
      </Box>
    </Drawer>
  );
};
