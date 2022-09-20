import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Image from "next/image";
import styles from "./principal.module.scss";
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
  { url: "/static/images/jarro_red_pr.jpg" },
  { url: "/static/images/pulidora.jpg" },
  { url: "/static/images/lamina.jpg" },
  { url: "/static/images/herrajes.jpg" },
  { url: "/static/images/botas.jpg" },
];

const fondoscel = [
  { url: "/static/images/jarroredver.jpg" },
  { url: "/static/images/pulidoraver.jpg" },
  { url: "/static/images/lamina.jpg" },
  { url: "/static/images/herrajes.jpg" },
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

      <Fade {...zoomOutProperties}>
        {fondoscel.map((i, index) => (
          <div className={styles["each-slide-cel"]} key={index}>
            <div
              style={{
                backgroundImage: `url(${i.url})`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        ))}
      </Fade>
      {/* <Fade {...zoomOutProperties}>
        {fondos.map((i, index) => (
          <Image src={i.url} width={6000} height={4000} alt="DDD" key={index} />
        ))}
      </Fade> */}
    </>
  );
};
