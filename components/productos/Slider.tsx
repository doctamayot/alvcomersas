import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import { Box } from "@mui/material";
import { IProducto } from "../../interfaces/productos";

interface Props {
  activeIndex: number;
  productos: IProducto[];
}

export const Slider: FC<Props> = ({ activeIndex, productos }) => {
  const [clas, setClas] = useState("");
  const [tog, setTog] = useState(true);

  const clases = ["anima", "anima2"];

  useEffect(() => {
    setTog(!tog);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className={tog ? "anima" : "anima2"}>
      <section className="outer-container-image">
        <Box
          sx={{
            //position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "0px",
            marginTop: { xs: "-300px", md: "300px", lg: "300px" },
          }}
        >
          <Image
            src={productos[activeIndex].images[0]}
            alt={productos[activeIndex].copy}
            width={400}
            height={400}
          />
        </Box>
      </section>
    </div>
  );
};
