"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUserProfile } from '@/store/slices/userSlice';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const userStatus = useAppSelector((state) => state.user.status);


  useEffect(() => {
    if (token) {
      if (userStatus === 'idle') {
        dispatch(fetchUserProfile());
      }
    } else {
      router.push('/login');
    }
  }, [token, isAuthenticated, userStatus, dispatch, router]);
  
  if (!isAuthenticated) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Загрузка...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
