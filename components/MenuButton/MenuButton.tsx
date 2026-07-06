import styles from "./MenuButton.module.scss";

export default function MenuButton() {
  return (
    <button type="button" className={styles.button} aria-label="Открыть меню">
      <span className={styles.burger} aria-hidden="true">
        <span className={`${styles.line} ${styles.lineTop}`} />
        <span className={styles.line} />
        <span className={`${styles.line} ${styles.lineBottom}`} />
      </span>
      <span className={styles.label}>Меню</span>
    </button>
  );
}
