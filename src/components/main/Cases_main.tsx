"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// -------- ДАННЫЕ ДЛЯ СЛАЙДЕРОВ (генерируются автоматически) --------

// ИСПРАВЛЕНО: Указываем, что у нас 10 картинок, как в папке
const livingSpacesSlides = Array.from({ length: 10 }, (_, i) => ({
  src: `/portfolio/l_${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Жилой интерьер ${i + 1}`,
}));

// ИЗМЕНЕНО: Указываем, что у нас 8 картинок, а не 10
const publicSpacesSlides = Array.from({ length: 8 }, (_, i) => ({
  src: `/portfolio/o_${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Общественное пространство ${i + 1}`,
}));


export default function CasesMain() {
  return (
    <section className="bg-[#EBEAE8] text-[#171717] font-sans py-16 lg:py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto lg:px-16 px-[30px]">
        <h2 className="text-[28px] lg:text-[42px] mb-[92px] lg:mb-12 font-thin tracking-wider">
          наши&nbsp;работы
        </h2>

        {/* ================== МОБИЛЬНАЯ ВЕРСТКА (< md) ================== */}
        <div className="md:hidden space-y-14">
          {/* ----- СЛАЙДЕР 1: ЖИЛЫЕ ИНТЕРЬЕРЫ ----- */}
          <div className="grid grid-cols-[28px_1fr_28px] items-center gap-x-[4px]">
            <button
              className="top-prev--m w-[18px] h-[18px] justify-self-end mt-[-40px] cursor-pointer"
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
                {livingSpacesSlides.map(({ src, alt }, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative aspect-[1280/720]">
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
              className="top-next--m w-[28px] h-[28px] grid place-items-center mt-[-40px] cursor-pointer"
              aria-label="Следующий слайд"
            >
              <Image src="/arrow_r.svg" alt="" width={18} height={18} />
            </button>
          </div>

          {/* ----- СЛАЙДЕР 2: ОБЩЕСТВЕННЫЕ ПРОСТРАНСТВА ----- */}
          <div className="grid grid-cols-[28px_1fr_28px] items-center gap-x-[10px] pt-[50px]">
            <button
              className="bottom-prev--m w-[28px] h-[28px] grid place-items-center cursor-pointer"
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
                {publicSpacesSlides.map(({ src, alt }, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative aspect-[1280/720]">
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
              className="bottom-next--m w-[28px] h-[28px] grid place-items-center justify-self-start cursor-pointer"
              aria-label="Следующий слайд"
            >
              <Image src="/arrow_r.svg" alt="" width={18} height={18} />
            </button>
          </div>
        </div>

        {/* ================== ДЕСКТОП/ПЛАНШЕТ (>= md) ================== */}
        <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 gap-x-4 gap-y-16">
          <div className="relative hidden md:flex items-center justify-end pr-1">
            <button className="top-prev--d cursor-pointer" aria-label="Предыдущий слайд">
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
              {livingSpacesSlides.map(({ src, alt }, i) => (
                <SwiperSlide key={i}>
                  <div className="relative aspect-[1280/720]">
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
              {publicSpacesSlides.map(({ src, alt }, i) => (
                <SwiperSlide key={i}>
                  <div className="relative aspect-[1280/720]">
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
            <button className="bottom-next--d cursor-pointer" aria-label="Следующий слайд">
              <Image src="/arrow_r.svg" alt="" width={28} height={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
