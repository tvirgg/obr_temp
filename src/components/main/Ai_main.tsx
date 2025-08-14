"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// -------- медиа и тексты из второй компоненты --------
const sliderTop = [
  { src: "/ai/1.jpg", alt: "AI 1" },
  { src: "/ai/2.jpg", alt: "AI 2" },
  { src: "/ai/3.jpg", alt: "AI 3" },
];

const sliderBottom = [
  { src: "/ai/4.jpg", alt: "AI 4" },
  { src: "/ai/5.jpg", alt: "AI 5" },
];

export default function CasesMain() {
  return (
    <section className="bg-[#EBEAE8] text-[#171717] font-sans py-16 lg:py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto lg:px-16 px-[30px]">

        {/* ================== МОБИЛЬНАЯ ВЕРСТКА (< md) ================== */}
        <div className="md:hidden space-y-14">
          {/* Текстовый блок — ПЕРЕНЕСЁН НАВЕРХ */}
          <h3 className="text-[28px] font-thin leading-tight">
            Нейросеть для создания<br />дизайн-проектов
          </h3>

          {/* Ряд 1 */}
          <div className="grid grid-cols-[28px_1fr_28px] items-center gap-x-[4px]">
            <button
              className="top-prev--m w-[18px] h-[18px] justify-self-end mt-[-40px]"
              aria-label="Предыдущий слайд"
            >
              <Image src="/arrow_l.svg" alt="" width={18} height={18} className="block" />
            </button>

            <div className="min-w-0 w-[65vw] ml-[20px]">
              <Swiper
                modules={[Navigation]}
                navigation={{ prevEl: ".top-prev--m", nextEl: ".top-next--m" }}
                loop
                className="w-full overflow-hidden"
              >
                {sliderTop.map(({ src, alt }, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative aspect-[4/2]">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={i === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <p className="mt-4 text-base">Жилые интерьеры</p>
            </div>

            <button
              className="top-next--m w-[28px] h-[28px] grid place-items-center opacity-0 pointer-events-none mt-[-40px]"
              aria-label="Следующий слайд"
            >
              <Image src="/arrow_r.svg" alt="" width={18} height={18} />
            </button>
          </div>

          {/* Ряд 2 */}
          <div className="grid grid-cols-[28px_1fr_28px] items-center gap-x-[10px]">
            <button
              className="bottom-prev--m w-[28px] h-[28px] grid place-items-center opacity-0 pointer-events-none"
              aria-label="Предыдущий слайд"
            >
              <Image src="/arrow_l.svg" alt="" width={18} height={18} />
            </button>

            <div className="min-w-0 w-[65vw] ml-auto">
              <Swiper
                modules={[Navigation]}
                navigation={{ prevEl: ".bottom-prev--m", nextEl: ".bottom-next--m" }}
                loop
                className="w-full overflow-hidden"
              >
                {sliderBottom.map(({ src, alt }, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative aspect-[4/2]">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority={i === 0}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <p className="mt-4 text-base">Общественные пространства</p>
            </div>

            <button
              className="bottom-next--m w-[28px] h-[28px] grid place-items-center justify-self-start"
              aria-label="Следующий слайд"
            >
              <Image src="/arrow_r.svg" alt="" width={18} height={18} />
            </button>
          </div>
        </div>

        {/* ================== ДЕСКТОП/ПЛАНШЕТ (>= md) ================== */}
        {/* 3 колонки: [слайдер | стрелка | текст/слайдер] */}
        <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] gap-x-12 gap-y-16">
          {/* Row 1 • Col 1 — верхний слайдер (слева) */}
          <div className="relative min-w-0">
            <Swiper
              modules={[Navigation]}
              navigation={{ prevEl: ".top-prev--d", nextEl: ".top-next--d" }}
              loop
              className="w-full overflow-hidden"
            >
              {sliderTop.map(({ src, alt }, i) => (
                <SwiperSlide key={i}>
                  <div className="relative aspect-[4/2]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:1280px) 50vw, 45vw"
                      priority={i === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="top-prev--d opacity-0 pointer-events-none absolute"
              aria-label="Предыдущий слайд"
              style={{ inset: 0 }}
            />
            <p className="mt-4 text-3xl">Жилые интерьеры</p>
          </div>

          {/* Row 1 • Col 2 — стрелка NEXT */}
          <div className="flex items-center justify-center">
            <button className="top-next--d cursor-pointer" aria-label="Следующий слайд">
              <Image src="/arrow_r.svg" alt="" width={32} height={32} className="object-contain" />
            </button>
          </div>

          {/* Row 1 • Col 3 — текст */}
          <div className="flex position-relative top-[-100px]">
            <h3 className="text-[42px] leading-tight font-cruinn font-light">
              Нейросеть для создания<br />дизайн-проектов
            </h3>
          </div>

          {/* Row 2 • Col 1 — пусто */}
          <div />

          {/* Row 2 • Col 2 — стрелка PREV */}
          <div className="flex items-center justify-center">
            <button className="bottom-prev--d cursor-pointer" aria-label="Предыдущий слайд">
              <Image src="/arrow_l.svg" alt="" width={32} height={32} className="object-contain" />
            </button>
          </div>

          {/* Row 2 • Col 3 — нижний слайдер */}
          <div className="relative min-w-0">
            <Swiper
              modules={[Navigation]}
              navigation={{ prevEl: ".bottom-prev--d", nextEl: ".bottom-next--d" }}
              loop
              className="w-full overflow-hidden"
            >
              {sliderBottom.map(({ src, alt }, i) => (
                <SwiperSlide key={i}>
                  <div className="relative aspect-[4/2]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:1280px) 50vw, 45vw"
                      priority={i === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="bottom-next--d opacity-0 pointer-events-none absolute"
              aria-label="Следующий слайд"
              style={{ inset: 0 }}
            />
            <p className="mt-4 text-3xl">Общественные пространства</p>
          </div>
        </div>
      </div>
    </section>
  );
}
