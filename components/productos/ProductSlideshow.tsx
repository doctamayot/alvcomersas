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
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        return (
          <div
            key={image}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                width: "100%",
                height: "500px",
                justifyContent: "center",
                backgroundPosition: "center",
              }}
            ></div> */}

            <Image src={image} alt="imagen" width={400} height={400} />
          </div>
        );
      })}
    </Slide>
  );
};
