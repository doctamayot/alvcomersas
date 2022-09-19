import { Fade } from "react-slideshow-image";
import styles from "./principal.module.scss";
import "react-slideshow-image/dist/styles.css";
import { Box, Typography } from "@mui/material";

const zoomOutProperties = {
  duration: 1000,
  transitionDuration: 3000,
  infinite: true,
  indicators: false,
  scale: 0.4,
  arrows: false,
  pauseOnHover: false,
};

const fondos = [
  { url: "/static/images/lamina.jpg" },
  { url: "/static/images/herrajes.jpg" },
  { url: "/static/images/jarro_red_pr.jpg" },
  { url: "/static/images/pulidora.jpg" },
  { url: "/static/images/botas.jpg" },
];

// const mapea = () => {
//   fondos.map((i) => console.log(i.url));
// };
// mapea();
export const Principal = () => {
  return (
    <>
      <Fade {...zoomOutProperties}>
        {fondos.map((i, index) => (
          <div className={styles["each-slide"]} key={index}>
            <div
              style={{
                backgroundImage: `url(${i.url})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        ))}
      </Fade>
    </>
  );
};
