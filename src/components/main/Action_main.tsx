import React from 'react';

// Данные для секций
const howSteps = [
  'Выберите помещение и загрузите фото',
  'Выберите стиль дизайна',
  'Выберите необходимые элементы интерьера',
  'Получите готовое дизайн-решение',
];

const forWhomData = [
  {
    title: 'Для студий дизайна и профессионалов.',
    text: 'Технология позволит уменьшить сроки визуализации и протестировать разные дизайн-решения и стили.',
  },
  {
    title: 'Для частных пользователей,',
    text: 'желающих создать дизайн интерьера самостоятельно',
  },
];

const advantages = ['Простое использование', 'Широкая вариативность', 'Высокая скорость'];

// Кнопка
const CreateDesignButton = () => (
<button className="w-1/2 border border-black/80 rounded-[15px] py-4 px-1 text-[36px] max-[1535px]:text-[32px] max-[1280px]:text-[24px] font-light tracking-wider hover:bg-black/5 transition-colors">
  создать дизайн
</button>
);

export function ActionMain() {
  // Насколько «внутрь» уводим крайние точки (в процентах ширины таймлайна)
  const EDGE_PCT = 8; // поменяй на 10–12, если нужно ещё ближе к центру

  return (
    <section className="bg-[#EBEAE8] text-[#171717] font-cruinn py-20 lg:py-32 overflow-x-hidden">
      {/* --- Секция "КАК?" --- */}
      <div className="mb-28 lg:mb-40">
        <div className="container mx-auto px-4 sm:px-8">
          <h2 className="text-[42px] mb-12 text-left font-light">КАК?</h2>
        </div>

        {/* --- Таймлайн --- */}
        {/* Десктоп */}
        <div className="hidden lg:block relative pt-10">
          {/* Линия на всю ширину страницы */}
          <div className="absolute top-10 left-0 w-full h-px bg-black/40" />

          {/* Контейнер точек */}
          <div className="container mx-auto px-4 sm:px-8 relative">
            {howSteps.map((step, index) => {
              const span = howSteps.length - 1;
              const leftPct = EDGE_PCT + ((100 - 2 * EDGE_PCT) * index) / span; // равномерно, но с отступами от краёв
              return (
                <div
                  key={index}
                  className="absolute -top-2 text-center"
                  style={{ left: `${leftPct}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="bg-[#EBEAE8] inline-block">
                    <div
                      className={`w-4 h-4 rounded-full mx-auto ${
                        index === howSteps.length - 1 ? 'bg-[#D95B43]' : 'bg-black'
                      }`}
                    />
                  </div>
                  <p className="mt-5 text-gray-700 text-base w-48">{step}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Мобильная версия */}
        <div className="lg:hidden container mx-auto px-4 sm:px-8">
          <div className="relative">
<div className="absolute left-2 top-1 bottom-1 w-px bg-black/60" />
            <div className="flex flex-col gap-12">
              {howSteps.map((step, index) => (
                <div key={index} className="relative pl-10">
                  <div
                    className={`absolute top-1.5 left-2 -translate-x-1/2 w-4 h-4 rounded-full ${
                      index === howSteps.length - 1 ? 'bg-[#D95B43]' : 'bg-black'
                    }`}
                  />
                  <p className="text-xl text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Остальной контент --- */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-20 lg:gap-x-20">
          {/* Левая колонка */}
          <div>
            <h2 className="text-[42px] font-light mb-10 ">для кого?</h2>
            <div className="space-y-8  text-[24px] font-[family-name:var(--font-doloman)]">
              {forWhomData.map((item, index) => (
                <div key={index}>
                  <p className="text-[#D95B43]">{item.title}</p>
                  <p className="text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка */}
          <div className="flex flex-col">
            <h2 className="font-light mb-10 text-[42px]">преимущества</h2>
            <div className="space-y-4  text-[24px] mb-4  max-[980px]:mb-12 font-[family-name:var(--font-doloman)]">
              {advantages.map((adv, index) => (
                <div key={index} className="flex items-center gap-6">
                  <span className="text-gray-500 font-mono w-5">{index + 1}</span>
                  <p className="ml-10 text-gray-800">{adv}</p>
                </div>
              ))}
            </div>
            <CreateDesignButton />
          </div>
        </div>
      </div>
    </section>
  );
}
