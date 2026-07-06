"use client";

import HoverSwapText, { swapTriggerClass } from "@/components/HoverSwapText/HoverSwapText";
import { cx } from "@/lib/cx";
import styles from "./CallbackLink.module.scss";

type CallbackLinkProps = {
  onClick: () => void;
};

export default function CallbackLink({ onClick }: CallbackLinkProps) {
  return (
    <button type="button" className={cx(styles.link, swapTriggerClass)} onClick={onClick}>
      <HoverSwapText>Заказать звонок</HoverSwapText>
    </button>
  );
}
