import Image from "next/image";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.photo}>
        <Image
          src="/images/hero-bg.jpg"
          alt="Дом бизнес-класса Инчапин"
          fill
          priority
          sizes="100vw"
          className={styles.photoImage}
        />
      </div>
      <div className={styles.row}>
        <h1 className={styles.title}>
          <Image
            src="/icons/logo-hero.svg"
            alt="Инчапин"
            width={717}
            height={114}
          />
        </h1>
        <p className={styles.subtitle}>
          Дом бизнес-класса <br />
          для ценителей роскоши
        </p>
      </div>
    </section>
  );
}
