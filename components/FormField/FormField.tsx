"use client";

import { useState } from "react";
import { IMaskInput } from "react-imask";
import { cx } from "@/lib/cx";
import styles from "./FormField.module.scss";

const PHONE_MASK = "+7 (000) 000-00-00";

type FormFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "tel" | "email";
  autoComplete?: string;
  error?: string;
};

export default function FormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  error,
}: FormFieldProps) {
  const isPhone = type === "tel";
  const [phoneFocused, setPhoneFocused] = useState(false);
  const errorId = error ? `${name}-error` : undefined;

  return (
    <label className={cx(styles.field, value !== "" && styles.filled, error && styles.invalid)}>
      <span className={styles.label}>{label}</span>
      {isPhone ? (
        <IMaskInput
          mask={PHONE_MASK}
          lazy={!phoneFocused}
          value={value}
          onAccept={(masked, mask) =>
            onChange(mask.unmaskedValue === "" ? "" : String(masked))
          }
          onFocus={() => setPhoneFocused(true)}
          onBlur={() => setPhoneFocused(false)}
          type="tel"
          inputMode="tel"
          name={name}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={styles.input}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          className={styles.input}
        />
      )}
      {error && (
        <span id={errorId} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </label>
  );
}
