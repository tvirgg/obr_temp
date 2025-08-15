"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// -------- ДАННЫЕ ДЛЯ СЛАЙДЕРОВ (генерируются автоматически из папки /ai) --------

// Слайдер для ЖИЛЫХ помещений (файлы /ai/l_01.jpg, l_02.jpg, ...)
const livingAiSlides = Array.from({ length: 10 }, (_, i) => ({
  src: `/ai/l_${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `AI Жилой интерьер ${i + 1}`,
}));

// Слайдер для ОБЩЕСТВЕННЫХ пространств (файлы /ai/o_01.jpg, o_02.jpg, ...)
const publicAiSlides = Array.from({ length: 10 }, (_, i) => ({
  src: `/ai/o_${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `AI Общественное пространство ${i + 1}`,
}));


export default function AiCasesComponent() { // Рекомендую дать компоненту осмысленное имя
  return (
    <section className="bg-[#EBEAE8] text-[#171717] font-sans py-16 lg:py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto lg:px-16 px-[30px]">

        {/* ================== МОБИЛЬНАЯ ВЕРСТКА (< md) ================== */}
        <div className="md:hidden space-y-14">
          <h3 className="text-[28px] font-thin leading-tight">
            Нейросеть для создания<br />дизайн-проектов
          </h3>

          {/* ----- СЛАЙДЕР 1: ЖИЛЫЕ ----- */}
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
                {livingAiSlides.map(({ src, alt }, i) => (
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

          {/* ----- СЛАЙДЕР 2: ОБЩЕСТВЕННЫЕ ----- */}
          <div className="grid grid-cols-[28px_1fr_28px] items-center gap-x-[10px]">
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
                {publicAiSlides.map(({ src, alt }, i) => (
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
        <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] gap-x-12 gap-y-16">
          {/* ----- СЛАЙДЕР 1: ЖИЛЫЕ ----- */}
          <div className="relative min-w-0">
            <Swiper
              modules={[Navigation]}
              navigation={{ prevEl: ".top-prev--d", nextEl: ".top-next--d" }}
              loop
              className="w-full overflow-hidden"
            >
              {livingAiSlides.map(({ src, alt }, i) => (
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
              className="top-prev--d cursor-pointer absolute"
              aria-label="Предыдущий слайд"
              style={{ inset: 0 }}
            />
            <p className="mt-4 text-3xl">Жилые интерьеры</p>
          </div>

          <div className="flex items-center justify-center">
            <button className="top-next--d cursor-pointer" aria-label="Следующий слайд">
              <Image src="/arrow_r.svg" alt="" width={32} height={32} className="object-contain" />
            </button>
          </div>

          <div className="flex relative top-[-100px] max-[1035px]:top-[-70px] justify-center">
            <h3 className="text-[32px] min-[1035px]:text-[42px] leading-tight font-cruinn font-light">
              Нейросеть для создания<br />дизайн-проектов
            </h3>
          </div>

          <div />

          <div className="flex items-center justify-center">
            <button className="bottom-prev--d cursor-pointer" aria-label="Предыдущий слайд">
              <Image src="/arrow_l.svg" alt="" width={32} height={32} className="object-contain" />
            </button>
          </div>

          {/* ----- СЛАЙДЕР 2: ОБЩЕСТВЕННЫЕ ----- */}
          <div className="relative min-w-0">
            <Swiper
              modules={[Navigation]}
              navigation={{ prevEl: ".bottom-prev--d", nextEl: ".bottom-next--d" }}
              loop
              className="w-full overflow-hidden"
            >
              {publicAiSlides.map(({ src, alt }, i) => (
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
              className="bottom-next--d cursor-pointer absolute"
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
