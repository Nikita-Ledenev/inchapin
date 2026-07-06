import Image from "next/image";
import AboutBadge from "@/components/AboutBadge/AboutBadge";
import VideoTeaser from "@/components/VideoTeaser/VideoTeaser";
import styles from "./About.module.scss";

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.grid}>
        <p className={styles.label}>О проекте</p>
        <div className={styles.photo}>
          <div className={styles.photoInner}>
            <Image
              src="/images/about-photo.jpg"
              alt="Архитектура дома Инчапин"
              fill
              sizes="(min-width: 1770px) 733px, (min-width: 1281px) 567px, (min-width: 1024px) 408px, 296px"
              className={styles.photoImage}
            />
          </div>
          <div className={styles.badge}>
            <AboutBadge />
          </div>
        </div>
        <div className={styles.body}>
          <Image
            src="/icons/logo-bar.svg"
            alt=""
            width={49}
            height={9}
            aria-hidden="true"
            className={styles.bar}
          />
          <h2 className={styles.heading}>
            Уютное и безопасное{" "}
            <br />
            пространство для счастливой,{" "}
            <br />
            <span className={styles.headingAccent}>
              спокойной и размеренной{" "}
              <br className={styles.accentBreak} />
              жизни
            </span>
          </h2>
          <p className={styles.text}>
            <span className={styles.textAccent}>
              Квартиры от 65 до 356 м² с чистовой отделкой,
            </span>{" "}
            балконами, лоджиями и террасами в собственной закрытой охраняемой
            территории.
          </p>
          <div className={styles.video}>
            <VideoTeaser />
          </div>
        </div>
      </div>
    </section>
  );
}
