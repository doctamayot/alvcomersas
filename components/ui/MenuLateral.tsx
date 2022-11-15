//react
import { useContext, useEffect, useState } from "react";
//Next
import { useRouter } from "next/router";
import { useSession, signOut, getProviders, signIn } from "next-auth/react";
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
  LibraryBooks,
  LoginOutlined,
  ManageHistory,
  MilitaryTech,
  PrecisionManufacturing,
  RollerSkating,
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

  const { data: session, status }: any = useSession();

  const [prov, setProv] = useState<any>({});

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setProv(providers as any);
    })();
  }, []);

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

          <ListItem
            button
            onClick={() => navigateTo("/productos/categoria/todas")}
          >
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Todos"} />
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
            onClick={() => navigateTo("/productos/categoria/botas")}
          >
            <ListItemIcon>
              <RollerSkating />
            </ListItemIcon>
            <ListItemText primary={"Botas Multipropósito"} />
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

          <Divider />
          <ListItem button onClick={() => navigateTo("/#historia")}>
            <ListItemIcon>
              <ManageHistory />
            </ListItemIcon>
            <ListItemText primary={"Historia"} />
          </ListItem>
          <ListItem button onClick={() => navigateTo("/blog")}>
            <ListItemIcon>
              <AssuredWorkload />
            </ListItemIcon>
            <ListItemText primary={"Blog"} />
          </ListItem>

          {session ? (
            <ListItem button onClick={() => signOut()}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItem>
          ) : (
            <ListItem
              button
              onClick={() => signIn(prov.google.id, { callbackUrl: "/" })}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItem>
          )}

          {/* Admin */}
          {session && session.user && session.user.role === "Admin" ? (
            <>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem button onClick={() => navigateTo("/admin/products")}>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={"Productos"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo("/admin/invproducts")}>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Inventario"} />
              </ListItem>

              <ListItem button onClick={() => navigateTo("/admin/blog")}>
                <ListItemIcon>
                  <LibraryBooks />
                </ListItemIcon>
                <ListItemText primary={"Blog"} />
              </ListItem>
            </>
          ) : null}
        </List>
      </Box>
    </Drawer>
  );
};
