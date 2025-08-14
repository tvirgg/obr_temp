"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react"; // <-- 1. Импортируем useEffect

// --- Типы для пропсов модального окна ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- Компонент модального окна ---
function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative z-[51] bg-[#EBEAE8] text-[#171717] rounded-2xl p-8 sm:p-12 shadow-2xl w-[90%] max-w-lg font-cruinn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть модальное окно"
          className="absolute top-4 right-4 text-3xl font-light text-black/70 hover:text-black transition-colors"
        >
          &times;
        </button>
        <div className="flex flex-col gap-5">
          <h3 className="text-4xl sm:text-5xl leading-none font-light">
            заказать проект
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <a
                href="mailto:obrazno-design@mail.ru"
                className="text-lg sm:text-xl underline decoration-2 underline-offset-4"
              >
                obrazno-design@mail.ru
              </a>
              <div className="flex items-center gap-3">
                <a href="https://wa.me/79600800104" aria-label="WhatsApp">
                  <Image src="/ws.svg" alt="WhatsApp" width={28} height={28} />
                </a>
                <a href="https://t.me/obrazno" aria-label="Telegram">
                  <Image src="/tg.svg" alt="Telegram" width={28} height={28} />
                </a>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-light">
              +7&nbsp;9600&nbsp;800&nbsp;104
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Основной компонент страницы ---
export default function Service_main() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // <-- 2. Добавляем хук useEffect для управления скроллом
  useEffect(() => {
    // Если окно открыто, блокируем скролл на <body>
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }

    // Функция очистки: будет вызвана, когда окно закроется или компонент исчезнет
    // Она восстанавливает скролл
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]); // <-- Этот эффект зависит только от состояния isModalOpen

  return (
    <>
      <section className="relative overflow-hidden bg-[#EBEAE8] text-[#171717] font-cruinn font-regular py-28 px-4 sm:px-8 lg:px-16">
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
          <h2 className="mb-16 leading-none text-center max-[980px]:text-[108px] min-[980px]:text-left min-[980px]:text-[160px]">
            услуги
          </h2>
          <div className="grid grid-cols-1 gap-y-12 gap-x-16 min-[980px]:grid-cols-2">
            
            {/* 1. Быстрые решения */}
            <article className="space-y-5 max-w-[560px] max-[980px]:w-[92%] max-[980px]:justify-self-start min-[980px]:order-1">
              <h3 className="font-medium">1. Быстрые решения</h3>
              <p className="font-light leading-relaxed">
                Пакет включает в себя разработку видовых кадров с новым дизайном
                при помощи нейросети. Наш дизайнер быстро создаст стилистические
                варианты для ваших помещений.
              </p>
              <p className="font-light">Стоимость от 5000 р. за кадр.</p>
            </article>

            {/* 2. Экономичный */}
            <article className="space-y-5 max-w-[560px] max-[980px]:w-[92%] max-[980px]:justify-self-end min-[980px]:order-3">
              <h3 className="font-medium">2. Экономичный</h3>
              <p className="font-light leading-relaxed">
                Пакет включает разработку видовых кадров с новым дизайном в
                нейросети, а также необходимого комплекта чертежей и
                спецификаций.
              </p>
              <p className="font-light">Стоимость от 1500 р/кв.м</p>
            </article>

            {/* 3. Оптимальный */}
            <article className="space-y-5 max-w-[560px] max-[980px]:w-[92%] max-[980px]:justify-self-start min-[980px]:order-5">
              <h3 className="font-medium">3. Оптимальный</h3>
              <p className="font-light leading-relaxed">
                Пакет включает в себя разработку реалистичной 3-D визуализации,
                полного комплекта чертежей и спецификаций.
              </p>
              <p className="font-light">Стоимость от 2500 р/кв.м</p>
            </article>

            {/* 4. Техно */}
            <article className="space-y-5 max-w-[560px] max-[980px]:w-[92%] max-[980px]:justify-self-end min-[980px]:order-2">
              <h3 className="font-medium">4. Техно</h3>
              <p className="font-light leading-relaxed">
                Подключив данный пакет, вы получаете возможность самостоятельно
                создать дизайн с помощью нейросети «Образно-ИИ». Данный пакет
                подойдёт для тех, кто хочет сам создать свой дизайн, а также для
                опытных дизайнеров, которым необходимо быстро презентовать
                решения своим заказчикам. Нейросеть находится на этапе
                разработки.
              </p>
            </article>

            {/* 5. Рабочая документация */}
            <article className="space-y-5 max-w-[560px] max-[980px]:w-[92%] max-[980px]:justify-self-start min-[980px]:order-4">
              <h3 className="font-medium">
                5. Рабочая документация к пакету Техно
              </h3>
              <p className="font-light leading-relaxed">
                Для тех, кто создал свой дизайн при помощи нейросети, мы
                предлагаем пакет необходимых для реализации чертежей и
                спецификаций.
              </p>
              <p className="font-light">Стоимость от 1500 р/кв.м</p>
            </article>

            {/* Кнопка Консультация */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                h-20 border border-black/80 rounded-[15px] py-4 px-1
                text-[16px] sm:text-3xl lg:text-4xl tracking-wider font-normal
                hover:bg-black/5 transition-colors
                w-full
                max-[980px]:w-1/2 max-[980px]:justify-self-end
                min-[980px]:order-6 min-[980px]:col-start-2 min-[980px]:self-start
              "
            >
              консультация
            </button>
          </div>
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}