"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export function Header() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const pathname = usePathname();

  return (
    <header className="bg-[#EBEAE8] top-0 z-10 w-full py-4">
      <div className="container mx-auto px-6 flex flex-col items-center">
        
        {/* Верхняя строка: Логотип (Ваш код) */}
        <div className="mb-5 mt-[20px]">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Образно Лого" 
              width={123}
              height={45} 
              priority
            />
          </Link>
        </div>

        {/* Нижняя строка: Навигация (с правильными ссылками) */}
        <nav className="hidden lg:flex justify-center items-center gap-[100px] text-sm font-medium tracking-wider text-[24px]">
          
          {/* "о нас" теперь ведет на /service */}
          <Link 
            href="/" 
            className={`${pathname === '/service' ? 'text-[#F14D34]' : 'text-gray-700'} hover:text-black transition-colors`}
          >
            о нас
          </Link>
          
          {/* "контакты" теперь - просто текст, без ссылки */}
          <span className="text-gray-700 cursor-default">
            контакты
          </span>
          
          {/* "образно AI" теперь ведет на /dashboard */}
          <Link 
            href="/dashboard" 
            className={`${pathname === '/dashboard' ? 'text-[#F14D34]' : 'text-gray-700'} hover:text-black transition-colors`}
          >
            образно AI
          </Link>
          
          {/* Иконка профиля/входа (Ваш код) */}
          <Link href={isAuthenticated ? "/login" : "/profile"} title={isAuthenticated ? "Профиль" : "Войти"}>
              <Image 
                src="/profile.svg" 
                alt="Профиль" 
                width={28} 
                height={28} 
              />
          </Link>
        </nav>
      </div>
    </header>
  );
}