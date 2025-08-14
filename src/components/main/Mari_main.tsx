import Image from "next/image";
import React from "react";

export default function MariMain() {
  return (
    <section className="relative overflow-hidden bg-[#EBEAE8] text-[#171717] py-16 px-4 sm:px-8 lg:px-16">
      {/* Декор справа */}
      <Image
        src="/circle.png"
        alt=""
        width={1200}
        height={1200}
        priority
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[60vw] object-contain object-right z-[1] select-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Заголовок: при ≤980px выравниваем вправо */}
        <h2 className="mb-8 text-[18vw] sm:text-[14vw] md:text-[10vw] xl:text-[200px] font-cruinn font-medium max-[980px]:text-right max-[980px]:ml-auto">
          О&nbsp;НАС
        </h2>

        {/* База: 1 колонка; ≥981px — 2 колонки 329px/1fr */}
        <div className="grid gap-12 min-[981px]:[grid-template-columns:329px_minmax(0,1fr)]">
          {/* Левая колонка (на мобиле растягивается на всю ширину) */}
          <div className="w-full min-[981px]:w-[329px] min-[981px]:mx-0 mx-auto flex flex-col gap-6">
            {/* ВЕРХНИЙ БЛОК: на мобиле превращаем в 2 подколонки: фото+должность | ценности */}
            <div className="max-[980px]:grid max-[980px]:grid-cols-2 max-[980px]:gap-6">
              {/* Фото + должность (левая подколонка на мобиле, обычный блок на десктопе) */}
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[4/5] w-full overflow-hidden shadow-lg">
                  <Image
                    src="/mari.png"
                    alt="Мария — генеральный директор студии Образно"
                    fill
                    sizes="(max-width:980px) 50vw, 329px"
                    className="object-cover"
                    priority
                  />
                </div>

                <p className="md:text-[24px] sm:text-[16px] leading-snug opacity-90 sm:text-[16px]">
                  Генеральный директор ООО «Образно». Архитектор-дизайнер
                </p>
              </div>

              {/* Ценности — ПОКАЗЫВАЕМ только на мобиле справа от фото */}
              <ul className="md:text-[24px] hidden max-[980px]:block sm:text-[16px]">
                <li>
                  <span className="font-medium text-[#D84242]">Творчество.</span>
                  <br /> Мы за&nbsp;сохранение «души» в&nbsp;ваших интерьерах;
                </li>
                <li className="mt-4">
                  <span className="font-medium text-[#D84242]">Индивидуальный подход.</span>
                  <br /> Никаких шаблонных решений;
                </li>
                <li className="mt-4">
                  <span className="font-medium text-[#D84242]">Профессионализм.</span>
                  <br /> Продуманные решения и&nbsp;системный подход;
                </li>
                <li className="mt-4">
                  <span className=" text-[#D84242]">Цифровизация.</span>
                  <br /> Передовые технологии и&nbsp;современный подход;
                </li>
              </ul>
            </div>

            {/* CTA + контакты */}
            <div className="flex flex-col gap-3  max-[980px]:hidden">
              <div className="text-[42px] leading-none font-cruinn font-light">
                заказать проект
              </div>

              {/* e-mail + оригинальные svg-иконки через <Image /> */}
              <div className="flex items-center gap-4">
                <a
                  href="mailto:obrazno-design@mail.ru"
                  className="text-[20px] underline decoration-2 underline-offset-4"
                >
                  obrazno-design@mail.ru
                </a>

                <a href="https://wa.me/79600800104" aria-label="WhatsApp" className="shrink-0">
                  <Image src="/ws.svg" alt="WhatsApp" width={28} height={28} />
                </a>
                <a href="https://t.me/obrazno" aria-label="Telegram" className="shrink-0">
                  <Image src="/tg.svg" alt="Telegram" width={28} height={28} />
                </a>
              </div>

              <div className="text-[24px] -mt-2">+7&nbsp;9600&nbsp;800&nbsp;104</div>
            </div>
          </div>

          {/* Правая колонка (на мобиле уходит НИЖЕ; ценности скрываем, чтобы не дублировались) */}
          <div className="max-w-full text-[24px] leading-[1.65] min-[981px]:pl-28 xl:pl-0">
            {/* Ценности — показываем только на ≥981px */}
            <ul className="mb-8 hidden min-[981px]:grid min-[981px]:grid-cols-2 min-[981px]:gap-x-10">
              <li>
                <span className="font-medium text-[#D84242]">Творчество.</span>
                <br /> Мы за&nbsp;сохранение «души» в&nbsp;ваших интерьерах;
              </li>
              <li>
                <span className="font-medium text-[#D84242]">Индивидуальный подход.</span>
                <br /> Никаких шаблонных решений;
              </li>
              <li>
                <span className="font-medium text-[#D84242]">Профессионализм.</span>
                <br /> Продуманные решения и&nbsp;системный подход;
              </li>
              <li>
                <span className="font-medium text-[#D84242]">Цифровизация.</span>
                <br /> Передовые технологии и&nbsp;современный подход;
              </li>
            </ul>

            {/* Описание (и на мобиле, и на десктопе) */}
            <p className="mb-6 md:text-[24px] sm:text-[16px]">
              ООО&nbsp;«Образно» — студия дуального дизайна с&nbsp;инновационным
              подходом к разработке дизайн-проектов с применением нейросетей.
              Технологичный современный подход даёт нам вариативные и временные
              преимущества на рынке.
            </p>
            <p className="md:text-[24px] sm:text-[16px]">
              На данный момент наша студия занимается разработкой проектов
              интерьерных решений жилых и общественных зданий.
            </p>
          </div>
                      <div className="flex flex-col gap-3 hidden max-[980px]:flex">
              <div className="text-[42px] leading-none font-cruinn font-light">
                заказать проект
              </div>

              {/* e-mail + оригинальные svg-иконки через <Image /> */}
              <div className="flex items-center gap-4">
                <a
                  href="mailto:obrazno-design@mail.ru"
                  className="text-[20px] underline decoration-2 underline-offset-4"
                >
                  obrazno-design@mail.ru
                </a>

                <a href="https://wa.me/79600800104" aria-label="WhatsApp" className="shrink-0">
                  <Image src="/ws.svg" alt="WhatsApp" width={28} height={28} />
                </a>
                <a href="https://t.me/obrazno" aria-label="Telegram" className="shrink-0">
                  <Image src="/tg.svg" alt="Telegram" width={28} height={28} />
                </a>
              </div>

              <div className="text-[24px] -mt-2">+7&nbsp;9600&nbsp;800&nbsp;104</div>
            </div>
        </div>
      </div>
    </section>
  );
}
