import Image from "next/image";
import { cx } from "@/lib/cx";
import styles from "./PhoneLink.module.scss";

const PHONE_HREF = "tel:+74955272121";
const PHONE_LABEL = "+7 495 527 21 21";

type PhoneLinkProps = {
  variant?: "text" | "icon";
  onClick?: () => void;
};

export default function PhoneLink({ variant = "text", onClick }: PhoneLinkProps) {
  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cx(styles.phone, styles.round)}
        aria-label="Заказать звонок"
      >
        <Image src="/icons/icon-phone.svg" alt="" width={14} height={14} />
      </button>
    );
  }

  return (
    <a href={PHONE_HREF} className={styles.phone}>
      {PHONE_LABEL}
    </a>
  );
}
