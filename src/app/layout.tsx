// apps/frontend/src/app/layout.tsx

import { ReduxProvider } from '../store/Provider'; // <-- ВАЖНО: Укажите правильный путь к вашему файлу
import { Header } from '../components/Header';
import './globals.css';

export const metadata = {
  title: 'Образно - AI Дизайн Интерьеров',
  description: 'Генерация фотореалистичных визуализаций интерьеров с помощью AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        {/* Оборачиваем всё в ВАШ ReduxProvider */}
        <ReduxProvider>
          <Header />
          <main>
            {/* Здесь будет контент ваших страниц */}
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}