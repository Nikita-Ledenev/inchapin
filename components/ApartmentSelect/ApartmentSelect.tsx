"use client";

import { useState } from "react";
import Image from "next/image";
import Select, {
  components,
  type DropdownIndicatorProps,
  type PlaceholderProps,
  type SingleValue,
  type SingleValueProps,
} from "react-select";
import HoverSwapText, { swapTriggerClass } from "@/components/HoverSwapText/HoverSwapText";
import { cx } from "@/lib/cx";
import styles from "./ApartmentSelect.module.scss";

type ApartmentOption = {
  value: string;
  label: string;
};

const apartmentOptions: ApartmentOption[] = [
  { value: "one-room", label: "1-комнатные" },
  { value: "two-room", label: "2-комнатные" },
  { value: "three-room", label: "3-комнатные" },
  { value: "penthouse", label: "Пентхаусы" },
];

function DropdownIndicator(props: DropdownIndicatorProps<ApartmentOption, false>) {
  return (
    <components.DropdownIndicator {...props}>
      <Image
        src="/icons/icon-chevron-down.svg"
        alt=""
        width={12}
        height={7}
        className={cx(styles.chevron, props.selectProps.menuIsOpen && styles.chevronOpen)}
      />
    </components.DropdownIndicator>
  );
}

function Placeholder(props: PlaceholderProps<ApartmentOption, false>) {
  return (
    <components.Placeholder {...props}>
      <HoverSwapText>{props.children}</HoverSwapText>
    </components.Placeholder>
  );
}

function SingleValueLabel(props: SingleValueProps<ApartmentOption, false>) {
  return (
    <components.SingleValue {...props}>
      <HoverSwapText>{props.children}</HoverSwapText>
    </components.SingleValue>
  );
}

export default function ApartmentSelect() {
  const [selected, setSelected] = useState<ApartmentOption | null>(null);

  const handleChange = (option: SingleValue<ApartmentOption>) => {
    setSelected(option);
  };

  return (
    <Select<ApartmentOption, false>
      instanceId="apartment-select"
      options={apartmentOptions}
      value={selected}
      onChange={handleChange}
      placeholder="Выбрать квартиру"
      aria-label="Выбрать квартиру"
      isSearchable={false}
      unstyled
      components={{ DropdownIndicator, Placeholder, SingleValue: SingleValueLabel }}
      classNames={{
        container: () => styles.container,
        control: () => cx(styles.control, swapTriggerClass),
        valueContainer: () => styles.valueContainer,
        placeholder: () => styles.text,
        singleValue: () => styles.text,
        indicatorsContainer: () => styles.indicators,
        menu: () => styles.menu,
        menuList: () => styles.menuList,
        option: (state) =>
          cx(
            styles.option,
            state.isFocused && styles.optionFocused,
            state.isSelected && styles.optionSelected,
          ),
      }}
    />
  );
}
