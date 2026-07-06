import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="Инчапин — на главную">
      <Image
        src="/icons/logo-header.svg"
        alt="Инчапин"
        width={156}
        height={25}
      />
    </Link>
  );
}
