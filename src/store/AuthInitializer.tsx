"use client";

import { useEffect, useState } from 'react';
import { useAppDispatch } from './hooks';
import { loadToken } from './slices/authSlice';

/**
 * Этот компонент-обертка гарантирует, что состояние аутентификации
 * будет инициализировано из localStorage ДО того, как остальная часть
 * приложения будет отрендерена на клиенте. Это предотвращает "мигание"
 * страницы входа для уже залогиненных пользователей.
 */
export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Синхронно диспатчим действие для загрузки токена
    dispatch(loadToken());
    // Сразу после диспатча говорим, что инициализация завершена
    setIsInitializing(false);
  }, [dispatch]);

  // Пока идет инициализация, ничего не рендерим (или показываем глобальный спиннер)
  if (isInitializing) {
    return null;
  }

  return <>{children}</>;
}
