import { FC } from "react";
import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import Image from "next/image";
import foto from "./fondo1.webp";

interface Props {
  images: string[];
}

export const ProductSlideshow: FC<Props> = ({ images }) => {
  return (
    <Slide easing="ease" duration={2000} indicators>
      {images.map((image) => {
        return (
          <div
            key={image}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "400px",
                justifyContent: "center",
                backgroundPosition: "center",
              }}
            ></div>

            {/* <Image src={image} alt="imagen" layout="intrinsic" /> */}
          </div>
        );
      })}
    </Slide>
  );
};
