"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchProjects, deleteProject } from '../../../store/slices/projectsSlice';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

interface Project {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  originalImageUrl: string;
  generatedImageUrl: string | null;
  style: { name: string };
}

const StatusBadge = ({ status }: { status: Project['status'] }) => {
  const styles = {
    pending: 'bg-gray-200 text-gray-800',
    processing: 'bg-blue-200 text-blue-800 animate-pulse',
    completed: 'bg-green-200 text-green-800',
    failed: 'bg-red-200 text-red-800',
  };
  const text = { pending: 'Ожидание', processing: 'В обработке', completed: 'Готово', failed: 'Ошибка' };
  return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>{text[status]}</span>;
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { items: projects, status } = useAppSelector((state) => state.projects);
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
    
    const isProcessing = projects.some(p => ['pending', 'processing'].includes(p.status));
    
    if (isProcessing && !pollingInterval.current) {
      pollingInterval.current = setInterval(() => dispatch(fetchProjects()), 5000);
    } else if (!isProcessing && pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }

    return () => { if (pollingInterval.current) clearInterval(pollingInterval.current); };
  }, [status, dispatch, projects]);

  const handleDelete = (id: string) => {
    if (window.confirm("Удалить проект?")) dispatch(deleteProject(id));
  };

  if (status === 'loading' && projects.length === 0) return <p className="text-center mt-10">Загрузка проектов...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Мои проекты</h1>
        <Link href="/create"><Button>Создать новый</Button></Link>
      </div>

      {projects.length === 0 ? (
        <Card className="text-center py-10"><p className="text-gray-500">У вас пока нет проектов.</p></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg leading-tight">{project.name}</h3>
                <StatusBadge status={project.status} />
              </div>
<p className="text-sm text-gray-500 mb-4">Стиль: {project.style?.name || '...'}</p>
              
              <div className="flex-grow grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <img src={project.originalImageUrl} alt="Original" className="w-full h-32 object-cover rounded-md bg-gray-200" />
                  <p className="text-xs mt-1 text-gray-500">Оригинал</p>
                </div>
                <div className="text-center">
                  {project.generatedImageUrl ? 
                    <img src={project.generatedImageUrl} alt="Generated" className="w-full h-32 object-cover rounded-md bg-gray-200" /> : 
                    <div className="w-full h-32 flex items-center justify-center bg-gray-200 rounded-md text-gray-400 text-3xl">?</div>}
                  <p className="text-xs mt-1 text-gray-500">Результат</p>
                </div>
              </div>

              <Button onClick={() => handleDelete(project.id)} variant="danger" size="sm" className="w-full mt-auto">Удалить</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
