import type { ReactNode } from "react";
import styles from "./HoverSwapText.module.scss";

export const swapTriggerClass = styles.trigger;

type HoverSwapTextProps = {
  children: ReactNode;
};

export default function HoverSwapText({ children }: HoverSwapTextProps) {
  return (
    <span className={styles.mask}>
      <span className={styles.line}>{children}</span>
      <span className={`${styles.line} ${styles.clone}`} aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
