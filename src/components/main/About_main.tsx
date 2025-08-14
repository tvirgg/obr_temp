import Image from "next/image";
import React from "react";

export function AboutMain() {
  return (
    <section className="bg-[#EBEAE8] text-[#171717] font-[family-name:var(--font-doloman)] pb-12  px-4 sm:px-8 lg:px-16 lg:pt-[120px] md:pt-[60px]">
      <div className="mx-auto max-w-[1300px]">
        {/* Верхний текстовый блок */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start mb-12">
          <div className="text-left">
            <h2 className="text-2xl font-normal leading-tight w-[325px] text-justify break-words">
              Студия дуального дизайна. Создание метода внедрения нейросетей в разработку дизайн-проекта
            </h2>
          </div>
          <div className="text-left md:pt-1">
            <p className="text-2xl font-normal leading-tight w-[300px] text-justify break-words md:ml-12">
              Современный подход к созданию дизайна интерьеров
            </p>
          </div>
        </div>

        {/* Desktop / tablet изображение */}
        <Image
          src="/Main_wrapper.png"
          alt="Современный конференц-зал"
          width={1920}
          height={1080}
          priority
          className="hidden md:block w-full h-auto"
          sizes="(min-width: 1024px) 1200px, 100vw"
        />

        {/* Mobile изображение (ограниченная высота) */}
        <div className="relative block md:hidden w-full h-[60vh] max-h-[680px]">
          <Image
            src="/Main_wrapper_mob.png"
            alt="Современный конференц-зал (моб.)"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
