"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import FormField from "@/components/FormField/FormField";
import HoverSwapText, { swapTriggerClass } from "@/components/HoverSwapText/HoverSwapText";
import { cx } from "@/lib/cx";
import { useIsMounted } from "@/lib/useIsMounted";
import styles from "./CallbackModal.module.scss";

const TRANSITION_MS = 300;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CallbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  name: string;
  phone: string;
  email: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

function validate({ name, phone, email }: FormValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!name.trim()) {
    errors.name = "Заполните поле";
  }

  if (!phone.trim()) {
    errors.phone = "Заполните поле";
  } else if (phone.replace(/\D/g, "").length < 11) {
    errors.phone = "Введите номер полностью";
  }

  if (!email.trim()) {
    errors.email = "Заполните поле";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Некорректный e-mail";
  }

  return errors;
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const isMounted = useIsMounted();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      openerRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const modal = modalRef.current;
      if (!modal) {
        return;
      }

      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, input, [href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !modal.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const runField = (field: keyof FormValues, value: string) => {
    if (submitted) {
      setErrors(validate({ name, phone, email, [field]: value }));
    }
  };

  const handleName = (value: string) => {
    setName(value);
    runField("name", value);
  };

  const handlePhone = (value: string) => {
    setPhone(value);
    runField("phone", value);
  };

  const handleEmail = (value: string) => {
    setEmail(value);
    runField("email", value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = { name, phone, email };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitted(true);

    const firstInvalid = (["name", "phone", "email"] as const).find(
      (field) => nextErrors[field],
    );
    if (firstInvalid) {
      modalRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    console.log(values);
  };

  const handleEntered = () => {
    modalRef.current?.querySelector("input")?.focus();
  };

  const handleExited = () => {
    setErrors({});
    setSubmitted(false);
    openerRef.current?.focus();
  };

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <CSSTransition
      in={isOpen}
      nodeRef={modalRef}
      timeout={TRANSITION_MS}
      mountOnEnter
      unmountOnExit
      onEntered={handleEntered}
      onExited={handleExited}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
    >
      <div
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="Заказать звонок"
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть окно"
        >
          <svg width="26" height="26" viewBox="0 0 27 27" fill="none" aria-hidden="true">
            <path d="M26.6426 0.357394L0.357814 26.6422" stroke="currentColor" strokeWidth="1.011" />
            <path d="M0.357394 0.357394L26.6422 26.6422" stroke="currentColor" strokeWidth="1.011" />
          </svg>
        </button>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.title}>Заказать звонок</h2>

          <div className={styles.fields}>
            <FormField
              label="Ваше имя"
              name="name"
              value={name}
              onChange={handleName}
              autoComplete="name"
              error={errors.name}
            />
            <FormField
              label="Телефон"
              name="phone"
              type="tel"
              value={phone}
              onChange={handlePhone}
              autoComplete="tel"
              error={errors.phone}
            />
            <FormField
              label="E-mail"
              name="email"
              type="email"
              value={email}
              onChange={handleEmail}
              autoComplete="email"
              error={errors.email}
            />
          </div>

          <p className={styles.disclaimer}>
            Нажимая на кнопку, вы ознакомлены и подтверждаете согласие с{" "}
            <button type="button" className={styles.policyLink}>
              политикой обработки персональных данных
            </button>
          </p>

          <button type="submit" className={cx(styles.submit, swapTriggerClass)}>
            <HoverSwapText>Отправить</HoverSwapText>
          </button>
        </form>
      </div>
    </CSSTransition>,
    document.body,
  );
}
