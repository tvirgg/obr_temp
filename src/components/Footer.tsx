import Image from 'next/image';

// media
import tgIcon from '../../public/tg.svg';
import wsIcon from '../../public/ws.svg';
import itParkLogo from '../../public/it_park.png';
import ploshadkaLogo from '../../public/ploshadka.png';
import fondInnovazLogo from '../../public/fond_inovaz.png';
import footerWave from '../../public/footer_logo.png';

const Footer = () => {
  return (
    <footer className="relative bg-[#EBEAE8] overflow-hidden font-[family-name:var(--font-doloman)] text-[16px] min-[1300px]:text-[24px] max-[500px]:px-4 px-6 lg:px-10 min-[1300px]:px-16">
      {/* Волна — адаптивная по высоте */}
      <div className="pointer-events-none select-none absolute inset-x-0 bottom-0 h-[45vw] min-[500px]:h-[36vw] sm:h-[32vw] md:h-[28vw] lg:h-[24vw] min-[1300px]:h-[350px] z-0">
        <Image src={footerWave} alt="" fill className="object-cover" priority sizes="100vw" />
      </div>

      {/* Контент */}
      <div className="relative z-10 mx-auto max-w-[1680px] min-[1300px]:px-12 pt-8 min-[500px]:pt-12 pb-[50vw] min-[500px]:pb-[42vw] md:pb-[32vw] min-[1300px]:pb-[360px]">
        <div
          className="
            grid items-start 
            /* --- САМЫЙ МАЛЕНЬКИЙ ЭКРАН (< 500px) --- */
            max-[500px]:grid-cols-1
            max-[500px]:justify-items-center
            max-[500px]:gap-y-8
            /* --- MOBILE (>= 500px) --- */
            min-[500px]:grid-cols-[auto_auto] 
            min-[500px]:justify-center 
            min-[500px]:gap-x-12
            min-[500px]:gap-y-10
            /* --- DESKTOP (>= 1300px) --- */
            min-[1300px]:grid-cols-[repeat(3,max-content)] 
            min-[1300px]:justify-between
            min-[1300px]:gap-x-8
          "
        >
          {/* ЛЕВО: контакты */}
          {/* --- ИЗМЕНЕНО: Добавлено центрирование для < 500px --- */}
          <div className="min-w-0 flex flex-col max-[500px]:items-center">
            {/* --- ИЗМЕНЕНО: Уменьшен шрифт для < 500px --- */}
            <h3 className="font-light text-[#D95B43] leading-tight text-[16px] min-[500px]:text-[18px] min-[1300px]:text-[24px] max-[500px]:text-center">
              ООО&nbsp;“Образно”<br />Татарстан, Казань
            </h3>

            <div className="mt-3 w-full flex flex-col max-[500px]:items-center">
              <h4 className="text-[16px] min-[500px]:text-[18px] min-[1300px]:text-2xl text-[#D95B43]">Контакты</h4>
              <div className="flex items-center gap-3 mt-2">
                <a href="https://wa.me/your_number" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  {/* --- ИЗМЕНЕНО: Уменьшен размер иконок для < 500px --- */}
                  <Image src={wsIcon} alt="" className="w-5 h-5 min-[500px]:w-6 min-[500px]:h-6 md:w-8 md:h-8 min-[1300px]:w-9 min-[1300px]:h-9" />
                </a>
                <a href="https://t.me/your_username" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <Image src={tgIcon} alt="" className="w-5 h-5 min-[500px]:w-6 min-[500px]:h-6 md:w-8 md:h-8 min-[1300px]:w-9 min-[1300px]:h-9" />
                </a>
              </div>
              <a
                href="mailto:obrazno-design@mail.ru"
                className="block mt-3 text-[#333] hover:text-[#D95B43] transition-colors text-[16px] min-[500px]:text-[18px] md:text-[22px] min-[1300px]:text-[26px] break-words"
              >
                obrazno-design@mail.ru
              </a>
            </div>

            <a
              href="/privacy-policy"
              className="block min-[1300px]:hidden mt-8 text-[#4B4B4B] hover:underline text-[16px] min-[500px]:text-[18px]"
            >
              Политика конфиденциальности
            </a>

            <div className="block min-[1300px]:hidden mt-12 min-[500px]:mt-16">
              <Image
                src={itParkLogo}
                alt="IT Park"
                /* --- ИЗМЕНЕНО: Уменьшен размер лого для < 500px --- */
                className="w-[32px] min-[500px]:w-[36px] md:w-[44px] h-auto"
                sizes="(max-width: 499px) 32px, (max-width: 767px) 36px, (max-width: 1299px) 44px"
                loading="lazy"
              />
            </div>
          </div>

          {/* ОБЕРТКА-ХАМЕЛЕОН */}
          <div className="flex flex-col gap-y-10 min-[1300px]:contents">

            {/* ЦЕНТР: Фонд + абзац */}
            {/* --- ИЗМЕНЕНО: Добавлено центрирование для < 500px --- */}
            <div className="min-w-0 flex flex-col items-start max-[500px]:items-center gap-4 min-[1300px]:flex-row min-[1300px]:items-center min-[1300px]:gap-8">
              <Image
                src={fondInnovazLogo}
                alt="Фонд содействия инновациям"
                /* --- ИЗМЕНЕНО: Уменьшен размер лого для < 500px --- */
                className="block max-w-[120px] min-[500px]:max-w-[130px] lg:max-w-[170px] min-[1300px]:max-w-[200px] h-auto shrink-0"
                priority
                sizes="(max-width: 499px) 120px, (max-width: 1023px) 130px, (max-width: 1299px) 170px, 200px"
              />
              <p className="min-w-0 max-w-[450px] text-[#4B4B4B] leading-[1.15] text-[14px] min-[500px]:text-[16px] md:text-[20px] min-[1300px]:text-[24px] break-words max-[500px]:text-center">
                Проект создан при поддержке Фонда&nbsp;Содействия&nbsp;Инновациям в рамках федерального проекта
                «Платформа университетского технологического предпринимательства»
              </p>
            </div>

            {/* ПРАВО: резидент + логотипы */}
            {/* --- ИЗМЕНЕНО: Добавлено центрирование для < 500px --- */}
            <div className="min-w-0 w-full flex flex-col items-start max-[500px]:items-center min-[1300px]:items-end">
              <a
                href="/privacy-policy"
                className="text-[#4B4B4B] hover:underline text-[20px] min-[1300px]:text-2xl hidden min-[1300px]:block"
              >
                Политика конфиденциальности
              </a>

              <div className="text-[#4B4B4B] text-[16px] min-[500px]:text-[18px] min-[1300px]:text-2xl mt-8 min-[1300px]:mt-1">Резидент площадки</div>

              {/* --- ИЗМЕНЕНО: Добавлено центрирование для < 500px --- */}
              <div className="mt-4 flex flex-row flex-wrap items-center justify-start max-[500px]:justify-center min-[1300px]:justify-end gap-5 min-[1300px]:gap-6">
                <Image
                  src={ploshadkaLogo}
                  alt="Площадка"
                  /* --- ИЗМЕНЕНО: Уменьшен размер лого для < 500px --- */
                  className="block w-[160px] min-[500px]:w-[180px] md:w-[200px] h-auto"
                  sizes="(max-width: 499px) 160px, (max-width: 767px) 180px, 200px"
                  loading="lazy"
                />
                <Image
                  src={itParkLogo}
                  alt="IT Park"
                  className="w-[44px] min-[1300px]:w-[50px] h-auto hidden min-[1300px]:block"
                  sizes="50px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;