"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// -------- данные --------
const sliderTop = [
  { src: "/portfolio/01.jpg", alt: "Работа 1" },
  { src: "/portfolio/02.jpg", alt: "Работа 2" },
  { src: "/portfolio/03.jpg", alt: "Работа 3" },
  { src: "/portfolio/04.jpg", alt: "Работа 4" },
];

const sliderBottom = [
  { src: "/portfolio/05.jpg", alt: "Работа 5" },
  { src: "/portfolio/06.jpg", alt: "Работа 6" },
  { src: "/portfolio/07.jpg", alt: "Работа 7" },
  { src: "/portfolio/08.jpg", alt: "Работа 8" },
];

export default function CasesMain() {
  return (
    <section className="bg-[#EBEAE8] text-[#171717] font-sans py-16 lg:py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto lg:px-16 px-[30px]">
        <h2 className="text-[28px] lg:text-[42px] mb-[92px] lg:mb-12 font-thin tracking-wider">
          наши&nbsp;работы
        </h2>

        {/* ================== МОБИЛЬНАЯ ВЕРСТКА (< md) ================== */}
        <div className="md:hidden space-y-14">
          {/* Ряд 1: стрелка слева, картинка вправо; одинаковый зазор 10px */}
          <div className="grid grid-cols-[28px_1fr_28px] items-center gap-x-[4px]">
            <button
              className="top-prev--m w-[18px] h-[18px] justify-self-end mt-[-40px]"
              aria-label="Предыдущий слайд"
            >
              <Image src="/arrow_l.svg" alt="" width={18} height={18} className="block" />
            </button>

            {/* Слайдер 65vw, смещён в ПРАВЫЙ край */}
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

            {/* правая кнопка скрыта, но ЯЧЕЙКА фиксированной ширины — для симметрии */}
            <button
              className="top-next--m w-[28px] h-[28px] grid place-items-center opacity-0 pointer-events-none  mt-[-40px]"
              aria-label="Следующий слайд"
            >
              <Image src="/arrow_r.svg" alt="" width={18} height={18} />
            </button>
          </div>

          {/* Ряд 2: стрелка справа, картинка вправо; такой же зазор 10px */}
          <div className="grid grid-cols-[28px_1fr_28px] items-center gap-x-[10px] pt-[50px]">
            {/* левая — скрыта, но место держим, чтобы отступы совпадали */}
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

        {/* ================== ДЕСКТОП/ПЛАНШЕТ (>= md) — без изменений ================== */}
        <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 gap-x-4 gap-y-16">
          <div className="relative hidden md:flex items-center justify-end pr-1">
            <button className="top-prev--d" aria-label="Предыдущий слайд">
              <Image src="/arrow_l.svg" alt="" width={28} height={28} />
            </button>
          </div>

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
              className="top-next--d opacity-0 pointer-events-none absolute"
              aria-label="Следующий слайд"
              style={{ inset: 0 }}
            />
            <p className="mt-4 text-3xl">Жилые интерьеры</p>
          </div>

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
              className="bottom-prev--d opacity-0 pointer-events-none absolute"
              aria-label="Предыдущий слайд"
              style={{ inset: 0 }}
            />
            <p className="mt-4 text-3xl">Общественные пространства</p>
          </div>

          <div className="relative hidden md:flex items-center pl-1">
            <button className="bottom-next--d" aria-label="Следующий слайд">
              <Image src="/arrow_r.svg" alt="" width={28} height={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
