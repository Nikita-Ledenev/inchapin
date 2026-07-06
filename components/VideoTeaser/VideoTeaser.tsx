import VideoBadge from "@/components/VideoBadge/VideoBadge";
import styles from "./VideoTeaser.module.scss";

export default function VideoTeaser() {
  return (
    <div className={styles.teaser}>
      <div className={styles.caption}>
        <p className={styles.title}>Видео о проекте</p>
        <p className={styles.duration}>1:25 минут</p>
      </div>
      <span className={styles.line} aria-hidden="true" />
      <VideoBadge />
    </div>
  );
}
