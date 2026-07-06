import type { Metadata } from "next";
import type { ReactNode } from "react";
import { proximaNova } from "./fonts";
import "./globals.scss";

export const metadata: Metadata = {
  title: "INCHAPIN — дом бизнес-класса",
  description:
    "Дом бизнес-класса INCHAPIN. Квартиры от 65 до 356 м² в окружении соснового леса.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" className={proximaNova.variable}>
      <body>{children}</body>
    </html>
  );
}
