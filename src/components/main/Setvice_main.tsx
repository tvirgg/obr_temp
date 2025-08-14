import Image from "next/image";
import React from "react";

export default function Setvice_main() {
  return (
    <section className="relative overflow-hidden bg-[#EBEAE8] text-[#171717] font-cruinn font-regular py-28 px-4 sm:px-8 lg:px-16">
      {/* круг скрыт на мобилке */}
      <Image
        src="/circle_l.png"
        alt=""
        width={1200}
        height={1200}
        aria-hidden
        sizes="(min-width:980px) 65vw, 0px"
        className="hidden min-[980px]:block pointer-events-none absolute inset-y-0 left-0 h-full w-[65vw] object-contain object-left z-[1] select-none"
      />

      <div className="relative z-[2] mx-auto max-w-5xl pl-0 min-[980px]:pl-[20%]">
        {/* заголовок */}
        <h2 className="mb-16 leading-none text-center max-[980px]:text-[108px] min-[980px]:text-left min-[980px]:text-[160px]">
          услуги
        </h2>

        {/* сетка: 1 колонка <980px, 2 колонки ≥980px */}
        <div className="grid grid-cols-1 gap-y-12 gap-x-16 min-[980px]:grid-cols-2">
          {/* 1 — слева на мобилке; десктоп: 1-я колонка, ряд 1 */}
          <article className="space-y-5 max-w-[560px] max-[980px]:w-[92%] max-[980px]:justify-self-start min-[980px]:order-1">
            <h3 className="font-medium">1. «Быстрые решения»</h3>
            <p className="font-light leading-relaxed">
              Пакет включает в себя разработку видовых кадров с новым дизайном
              при помощи нейросети. Наш дизайнер быстро создаст стилистические
              варианты для ваших помещений.
            </p>
            <p className="font-light">Стоимость от 5000 р. за кадр.</p>
          </article>

          {/* 2 — справа на мобилке; десктоп: 1-я колонка, ряд 2 */}
          <article className="space-y-5 max-w-[560px] max-[980px]:w-[92%] max-[980px]:justify-self-end min-[980px]:order-3">
            <h3 className="font-medium">2. «Экономичный»</h3>
            <p className="font-light leading-relaxed">
              Пакет включает разработку видовых кадров с новым дизайном
              в нейросети, а также необходимого комплекта чертежей
              и спецификаций.
            </p>
            <p className="font-light">Стоимость от 1500 р/кв.м</p>
          </article>

          {/* 3 — слева на мобилке; десктоп: 1-я колонка, ряд 3 (после кнопки) */}
          <article className="space-y-5 max-w-[560px] max-[980px]:w-[92%] max-[980px]:justify-self-start min-[980px]:order-6">
            <h3 className="font-medium">3. «Оптимальный»</h3>
            <p className="font-light leading-relaxed">
              Пакет включает в себя разработку реалистичной 3-D визуализации,
              полного комплекта чертежей и спецификаций.
            </p>
            <p className="font-light">Стоимость от 2500 р/кв.м</p>
          </article>

          {/* 4 — справа на мобилке; десктоп: 2-я колонка, ряд 1 */}
          <article className="space-y-5 max-w-[560px] max-[980px]:w-[92%] max-[980px]:justify-self-end min-[980px]:order-2">
            <h3 className="font-medium">4. «Техно»</h3>
            <p className="font-light leading-relaxed">
              Подключив данный пакет, вы получаете возможность самостоятельно
              создать дизайн с помощью нейросети «Образно-ИИ». Данный пакет
              подойдёт для тех, кто хочет сам создать свой дизайн, а также для
              опытных дизайнеров, которым необходимо быстро презентовать решения
              своим заказчикам. Нейросеть находится на этапе разработки.
            </p>
          </article>

          {/* 5 — слева на мобилке; десктоп: 2-я колонка, ряд 2 */}
          <article className="space-y-5 max-w-[560px] max-[980px]:w-[92%] max-[980px]:justify-self-start min-[980px]:order-4">
            <h3 className="font-medium">
              5. «Рабочая документация к пакету “Техно”»
            </h3>
            <p className="font-light leading-relaxed">
              Для тех, кто создал свой дизайн при помощи нейросети, мы предлагаем
              пакет необходимых для реализации чертежей и спецификаций.
            </p>
            <p className="font-light">Стоимость от 1500 р/кв.м</p>
          </article>

          {/* Кнопка — СРАЗУ после 5 на ПК (2-я колонка, ряд 3);
              на мобилке — справа и на ~50% ширины */}
          <button
            className="
              h-20 border border-black/80 rounded-[15px] py-4 px-1
              text-[16px] sm:text-3xl lg:text-4xl tracking-wider font-normal
              hover:bg-black/5 transition-colors
              w-full
              max-[980px]:w-1/2 max-[980px]:justify-self-end
              min-[980px]:order-5 min-[980px]:col-start-2
              min-[980px]:relative min-[980px]:top-[120px]
            "
          >
            консультация
          </button>
        </div>
      </div>
    </section>
  );
}
