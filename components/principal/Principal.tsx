import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { PrincipalLayout } from "../layouts";
import styles from "./principal.module.scss";

import { useSession } from "next-auth/react";
import { Loading } from "../ui";

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
  { url: "/static/images/jarro_red_pr.webp" },
  { url: "/static/images/pulidora.webp" },
  { url: "/static/images/lamina.webp" },
  { url: "/static/images/herrajes.webp" },
  { url: "/static/images/botas.webp" },
];

const fondoscel = [
  { url: "/static/images/jarroredver.webp" },
  { url: "/static/images/pulidoraver.webp" },
  { url: "/static/images/lamina.webp" },
  { url: "/static/images/herrajes.webp" },
];

export const Principal = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }
  return (
    <PrincipalLayout
      title="Alvcomer sas"
      description="Página principal de Alvcomer"
    >
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
    </PrincipalLayout>
  );
};
