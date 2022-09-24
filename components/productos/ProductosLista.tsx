import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState, FC, useEffect } from "react";
import NextLink from "next/link";
import { Slider } from "./Slider";
import cn from "classnames";
import {
  AcUnit,
  ArrowCircleDown,
  ArrowCircleUp,
  ArrowForward,
} from "@mui/icons-material";

import { IProducto } from "../../interfaces/productos";

interface Props {
  products: IProducto[];
  titulo: string;
}

export const ProductosLista: FC<Props> = ({ products, titulo }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Used to determine which items appear above the active item
  const halfwayIndex = Math.ceil(products.length / 2);

  // Usd to determine the height/spacing of each item
  const itemHeight = 52;

  // Used to determine at what point an item is moved from the top to the bottom
  const shuffleThreshold = halfwayIndex * itemHeight;

  // Used to determine which items should be visible. this prevents the "ghosting" animation
  const visibleStyleThreshold = shuffleThreshold / 2;

  const determinePlacement = (itemIndex: any): number | undefined => {
    // If these match, the item is active
    if (activeIndex === itemIndex) return 0;

    if (itemIndex >= halfwayIndex) {
      if (activeIndex > itemIndex - halfwayIndex) {
        return (itemIndex - activeIndex) * itemHeight;
      } else {
        return -(products.length + activeIndex - itemIndex) * itemHeight;
      }
    }

    if (itemIndex > activeIndex) {
      return (itemIndex - activeIndex) * itemHeight;
    }

    if (itemIndex < activeIndex) {
      if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
        return (products.length - (activeIndex - itemIndex)) * itemHeight;
      }
      return -(activeIndex - itemIndex) * itemHeight;
    }
  };

  useEffect(() => {
    handleClick("next");
  }, []);

  const handleClick = (direction: any) => {
    setInterval(() => {
      setActiveIndex((prevIndex) => {
        if (direction === "next") {
          if (prevIndex + 1 > products.length - 1) {
            return 0;
          }
          return prevIndex + 1;
        }

        if (prevIndex - 1 < 0) {
          return products.length - 1;
        }

        return prevIndex - 1;
      });
    }, 10000);
  };

  return (
    <Grid
      container
      spacing={8}
      sx={{
        backgroundColor: "#fec526",
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={4}
        sx={{
          margin: "120px 20px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            width: "90%",
          }}
        >
          {/* <Typography
            variant="h2"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "50px",
              fontWeight: "100",
            }}
          >
            Categoria
          </Typography> */}
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "40px",
              fontWeight: "bolder",
              color: "#fff",

              lineHeight: "70px",
            }}
          >
            {titulo}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              marginTop: "10px",
              fontWeight: "100",
            }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
            doloremque quod asperiores quibusdam sit at incidunt possimus, sunt
            similique et. Accusantium vitae nam eum blanditiis corrupti quos
            quisquam quibusdam architecto.
          </Typography>
          <div className="container">
            <section className="outer-container">
              <div className="carousel-wrapper">
                <button
                  type="button"
                  className="carousel-button prev"
                  onClick={() => handleClick("prev")}
                >
                  <ArrowCircleUp sx={{ marginBottom: "0px" }} />
                </button>

                <div className="carousel">
                  <div className="slides">
                    <div className="carousel-inner">
                      {products.map((item: any, i: any) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveIndex(i)}
                          className={cn("carousel-item", {
                            active: activeIndex === i,
                            visible:
                              Math.abs(Number(determinePlacement(i))) <=
                              visibleStyleThreshold,
                          })}
                          style={{
                            transform: `translateY(${determinePlacement(i)}px)`,
                          }}
                        >
                          <Box
                            sx={{
                              fontFamily: "Montserrat, sans-serif",
                              fontSize: "25.2px",
                              fontWeight: "bolder",
                              display: "flex",
                            }}
                          >
                            <AcUnit />
                            <Typography
                              variant="h6"
                              sx={{ marginLeft: "10px" }}
                            >
                              {item.titulo}
                            </Typography>
                          </Box>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="carousel-button next"
                  onClick={() => handleClick("next")}
                >
                  <ArrowCircleDown />
                </button>
              </div>
            </section>
          </div>
        </Box>
      </Grid>
      <Grid item xs={3} sx={{ marginTop: "0px", marginLeft: "-120px" }}>
        <Slider activeIndex={activeIndex} productos={products} />
      </Grid>
      <Grid item xs={3} sx={{ marginTop: "400px" }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            color: "#fff",
            fontSize: "60px",
          }}
        >
          {products[activeIndex].titulo}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginTop: "30px",
            fontFamily: "Montserrat, sans-serif",
            fontSize: "20px",
          }}
        >
          {products[activeIndex].copy}
        </Typography>
        <NextLink
          href={`/productos/${products[activeIndex].slug}`}
          passHref
          prefetch={false}
        >
          <Button
            endIcon={<ArrowForward />}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              marginTop: "30px",
              width: "300px",
            }}
          >
            Ver más
          </Button>
        </NextLink>
      </Grid>
    </Grid>
  );
};
