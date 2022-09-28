//React
import React, { useState, useContext, useEffect } from "react";

//Next
import { useRouter } from "next/router";
import Image from "next/image";
import NextLink from "next/link";

import { useSession, signOut, signIn, getProviders } from "next-auth/react";

//MUI
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  ClearOutlined,
  SearchOutlined,
  Widgets,
  ExitToApp,
  Person,
} from "@mui/icons-material";

//App
import logo from "../../public/static/images/logo.png";
import { UiContext } from "../../context";

export const Navbar = () => {
  const { push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [prov, setProv] = useState<any>({});

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setProv(providers as any);
    })();
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { data: session, status } = useSession();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <AppBar
      sx={{
        height: 90,
        fontSize: "16.2px",
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Image
              src={logo}
              width={100}
              height={80}
              alt="Alvcomer SAS Productos Militares"
            />
          </Link>
        </NextLink>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
            marginLeft: "80px",
          }}
          className="fadeIn"
        >
          <NextLink href="/#historia" passHref>
            <Link>
              <Button
                variant="text"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "16.2px",
                  color: "#fff",
                }}
              >
                Alvcomer SAS
              </Button>
            </Link>
          </NextLink>

          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              backgroundColor: "transparent",
            }}
          >
            <Typography
              sx={{
                backgroundColor: "transparent",
                color: "#fff",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "16.2px",
              }}
            >
              Productos
            </Typography>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              //onClick={handleClose}
            >
              <NextLink href="/productos/categoria/todas" passHref>
                <Typography
                  sx={{
                    backgroundColor: "transparent",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "16.2px",
                    color: "#000",
                  }}
                >
                  Todos
                </Typography>
              </NextLink>
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              //onClick={handleClose}
            >
              <NextLink href="/productos/categoria/militares" passHref>
                <Typography
                  sx={{
                    backgroundColor: "transparent",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "16.2px",
                    color: "#000",
                  }}
                >
                  Equipo Militar o Camping
                </Typography>
              </NextLink>
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              // onClick={handleClose}
            >
              <NextLink href="/productos/categoria/herrajes" passHref>
                <Typography
                  sx={{
                    backgroundColor: "transparent",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "16.2px",
                    color: "#000",
                  }}
                >
                  Herrajes
                </Typography>
              </NextLink>
            </MenuItem>
            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              // onClick={handleClose}
            >
              <NextLink href="/productos/categoria/inst" passHref>
                <Typography
                  sx={{
                    backgroundColor: "transparent",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "16.2px",
                    color: "#000",
                  }}
                >
                  Institucional
                </Typography>
              </NextLink>
            </MenuItem>

            <MenuItem
              sx={{ fontFamily: "Montserrat, sans-serif" }}
              // onClick={handleClose}
            >
              <NextLink href="/productos/categoria/servicios" passHref>
                <Typography
                  sx={{
                    backgroundColor: "transparent",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "16.2px",
                    color: "#000",
                  }}
                >
                  Servicio de Troquelado y embutido
                </Typography>
              </NextLink>
            </MenuItem>
          </Menu>

          <NextLink href="/category/women" passHref>
            <Link>
              <Button
                variant="text"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "16.2px",
                  color: "#fff",
                }}
              >
                Blog
              </Button>
            </Link>
          </NextLink>

          <NextLink href="#footer" passHref>
            <Link>
              <Button
                variant="text"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "16.2px",
                  color: "#fff",
                }}
              >
                Encuéntranos
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        {isSearchVisible ? (
          <Input
            sx={{
              display: { xs: "none", sm: "flex" },
              color: "#FFF",
              borderBottom: "0.5px solid #fff",
            }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            type="text"
            disableUnderline={true}
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined sx={{ color: "#FFF" }} />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{ display: { xs: "none", sm: "flex" }, color: "#FFF" }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {session ? (
          <Box
            onClick={() => signOut()}
            sx={{ display: { xs: "flex" } }}
            alignItems="center"
          >
            <IconButton sx={{ display: { xs: "flex" }, color: "#fff" }}>
              <ExitToApp sx={{ marginRight: "10px" }} />
              <Typography
                sx={{
                  marginRight: "20px",
                  fontSize: "0.8em",
                  color: "#fff",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Logout
              </Typography>
            </IconButton>
          </Box>
        ) : (
          <Box
            display="flex"
            onClick={() =>
              signIn(prov.google.id, {
                callbackUrl: "/",
              })
            }
          >
            <IconButton sx={{ display: { xs: "flex" }, color: "#fff" }}>
              <Person />
              <Typography
                sx={{
                  marginRight: "20px",
                  marginLeft: "10px",

                  fontSize: "20px",
                  color: "#fff",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Login
              </Typography>
            </IconButton>
          </Box>
        )}

        <Button
          onClick={toggleSideMenu}
          variant="text"
          sx={{ fontSize: "16.2px", color: "#fff" }}
        >
          <Widgets />
        </Button>
      </Toolbar>
    </AppBar>
  );
};
