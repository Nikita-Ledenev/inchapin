import ApartmentSelect from "@/components/ApartmentSelect/ApartmentSelect";
import CallbackLink from "@/components/CallbackLink/CallbackLink";
import Logo from "@/components/Logo/Logo";
import MenuButton from "@/components/MenuButton/MenuButton";
import PhoneLink from "@/components/PhoneLink/PhoneLink";
import styles from "./Header.module.scss";

type HeaderProps = {
  onCallbackClick: () => void;
};

export default function Header({ onCallbackClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <MenuButton />
        <div className={styles.phoneRound}>
          <PhoneLink variant="icon" onClick={onCallbackClick} />
        </div>
        <ApartmentSelect />
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.contacts}>
        <PhoneLink />
        <CallbackLink onClick={onCallbackClick} />
      </div>
    </header>
  );
}
