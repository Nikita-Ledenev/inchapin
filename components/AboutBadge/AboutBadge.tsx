import Image from "next/image";
import styles from "./AboutBadge.module.scss";

export default function AboutBadge() {
  return (
    <div className={styles.badge} aria-hidden="true">
      <Image
        src="/icons/logo-badge-symbol.svg"
        alt=""
        width={49}
        height={68}
      />
    </div>
  );
}
