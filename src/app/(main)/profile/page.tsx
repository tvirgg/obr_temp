"use client";

import { useState, FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUserProfile, deleteUserAccount } from '@/store/slices/userSlice';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { profile, status, error } = useAppSelector((state) => state.user);

  const [name, setName] = useState(profile?.name || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState('');
  
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
    }
  }, [profile]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setNotification(null);
    const updateData: { name?: string; password?: string } = {};

    if (name !== profile?.name) {
      updateData.name = name;
    }
    if (password) {
      if (password !== confirmPassword) {
        setNotification({type: 'error', message: 'Пароли не совпадают'});
        return;
      }
      updateData.password = password;
    }

    if (Object.keys(updateData).length > 0) {
      const result = await dispatch(updateUserProfile(updateData));
      if (updateUserProfile.fulfilled.match(result)) {
        setNotification({type: 'success', message: 'Профиль успешно обновлен!'});
        setPassword('');
        setConfirmPassword('');
      } else {
        setNotification({type: 'error', message: (result.payload as string) || 'Ошибка обновления'});
      }
    }
  };

  const handleDelete = async () => {
      setNotification(null);
      if (deleteConfirm.toLowerCase() !== 'удалить') {
          setNotification({type: 'error', message: 'Введите "удалить" для подтверждения.'});
          return;
      }
      if (window.confirm('Вы абсолютно уверены? Это действие необратимо.')) {
          dispatch(deleteUserAccount());
      }
  }

  if (!profile) return <p>Загрузка профиля...</p>;

  return (
    <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
      <Card>
        <h2 className="text-2xl font-bold mb-4">Личные данные</h2>
        
        {notification && (
            <div className={`p-3 mb-4 rounded-md text-sm ${
                notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
            {notification.message}
            </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label htmlFor="email">Email (нельзя изменить)</label>
            <Input id="email" type="email" value={profile.email} disabled />
          </div>
          <div>
            <label htmlFor="name">Имя</label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Новый пароль</label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Оставьте пустым, если не хотите менять"/>
          </div>
          <div>
            <label htmlFor="confirmPassword">Повторите новый пароль</label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <Button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
        </form>
      </Card>

      <Card>
        <h2 className="text-2xl font-bold mb-4 text-red-600">Опасная зона</h2>
        <p className="mb-4">Удаление аккаунта приведет к безвозвратному удалению всех ваших данных и проектов.</p>
        <div>
          <label htmlFor="deleteConfirm">Для подтверждения введите "удалить"</label>
          <Input 
            id="deleteConfirm" 
            type="text"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            className="border-red-500 focus:ring-red-500"
          />
        </div>
        <Button onClick={handleDelete} variant="danger" className="mt-4 w-full" disabled={status === 'loading'}>
          Удалить аккаунт
        </Button>
      </Card>
    </div>
  );
}