// app/fonts.ts
import localFont from "next/font/local";

export const doloman = localFont({
  variable: "--font-doloman",       // объявим переменную
  display:  "swap",
  src: [
    { path: "../../public/fonts/DolomanPavljenko.otf", weight: "400", style: "normal" },
    // добавьте Bold/Italic при необходимости
  ],
});
