import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import styles from "./principal.module.scss";

import { useSession } from "next-auth/react";
import { Loading } from "../ui";

const zoomOutProperties = {
  duration: 1000,
  transitionDuration: 3000,
  infinite: true,
  indicators: false,
  scale: 0.6,
  arrows: false,
  pauseOnHover: false,
  autoplay: true,
};

const fondos = [
  {
    url: "https://res.cloudinary.com/alvcomer/image/upload/v1664329018/jarro_red_pr_sutpxc.webp",
  },
  {
    url: "https://res.cloudinary.com/alvcomer/image/upload/v1664329019/pulidora_t7jhgb.webp",
  },
  {
    url: "https://res.cloudinary.com/alvcomer/image/upload/v1664329017/lamina_v3whqr.webp",
  },
  {
    url: "https://res.cloudinary.com/alvcomer/image/upload/v1664329018/herrajes_ym4riy.webp",
  },
  {
    url: "https://res.cloudinary.com/alvcomer/image/upload/v1664329018/botas_r9xh3q.webp",
  },
];

const fondoscel = [
  {
    url: "https://res.cloudinary.com/alvcomer/image/upload/v1664329021/jarroredver_ytmdqu.webp",
  },
  {
    url: "https://res.cloudinary.com/alvcomer/image/upload/v1664329022/pulidoraver_mo6jzw.webp",
  },
  {
    url: "https://res.cloudinary.com/alvcomer/image/upload/v1664329017/lamina_v3whqr.webp",
  },
  {
    url: "https://res.cloudinary.com/alvcomer/image/upload/v1664329018/herrajes_ym4riy.webp",
  },
];

export const Principal = () => {
  const { data: session, status } = useSession();

  //console.log(session.user.role);

  // if (status === "loading") {
  //   return <Loading />;
  // }
  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          <Slide {...zoomOutProperties}>
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
          </Slide>
          <Slide {...zoomOutProperties}>
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
          </Slide>
        </>
      )}
    </>
  );
};
