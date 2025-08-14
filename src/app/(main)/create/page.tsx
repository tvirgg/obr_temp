"use client";

import { useEffect, useState, DragEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../../lib/api';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createAndGenerateProject } from '../../../store/slices/projectsSlice';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';

// Типы
interface Style { id: string; name: string; slug: string; }
interface FurnitureItem { id: string; name: string; category: 'furniture' | 'decor'; icon: string; }

const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export default function CreatePage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { status: generationStatus, error: generationError } = useAppSelector(state => state.projects);

    // Локальное состояние для справочников
    const [styles, setStyles] = useState<Style[]>([]);
    const [furniture, setFurniture] = useState<FurnitureItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Локальное состояние формы
    const [projectName, setProjectName] = useState('');
    const [prompt, setPrompt] = useState('');
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [referenceImages, setReferenceImages] = useState<File[]>([]);
    const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
    const [referenceImagePreviews, setReferenceImagePreviews] = useState<string[]>([]);
    const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
    const [selectedFurniture, setSelectedFurniture] = useState<Record<string, boolean>>({});
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [stylesRes, furnitureRes] = await Promise.all([api.get('/styles'), api.get('/furniture')]);
                setStyles(stylesRes.data);
                setFurniture(furnitureRes.data);
            } catch (error) {
                setErrors({ general: "Не удалось загрузить данные для создания проекта." });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const validateForm = () => {
        const newErrors: { [key: string]: string | undefined } = {};
        if (!projectName.trim()) newErrors.projectName = "Введите название проекта.";
        if (!originalImage) newErrors.originalImage = "Загрузите основное изображение.";
        if (!selectedStyleId) newErrors.style = "Выберите стиль.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleGenerate = async () => {
        if (!validateForm()) return;

        const checklist = Object.keys(selectedFurniture).filter(key => selectedFurniture[key]).map(itemId => ({ itemId }));
        
        dispatch(createAndGenerateProject({
            projectName,
            prompt: prompt.trim(),
            originalImage: originalImage!,
            referenceImages,
            selectedStyleId: selectedStyleId!,
            checklist,
        })).unwrap()
        .then(() => {
            alert("Задача на генерацию успешно создана! Вы будете перенаправлены на страницу проектов.");
            router.push('/dashboard');
        })
        .catch((error) => {
            setErrors({ general: error || "Произошла неизвестная ошибка." });
        });
    };
    
    // --- Остальные хендлеры (без изменений) ---
    const handleOriginalImageSelect = (file: File | undefined) => { if (file && file.type.startsWith('image/')) { setOriginalImage(file); if (originalImagePreview) URL.revokeObjectURL(originalImagePreview); setOriginalImagePreview(URL.createObjectURL(file)); setErrors(p => ({ ...p, originalImage: undefined })); } };
    const handleReferenceImagesSelect = (files: FileList | null) => { if (files) { const newFiles = Array.from(files); if (referenceImages.length + newFiles.length > 3) { alert("Максимум 3 референса."); return; } setReferenceImages(p => [...p, ...newFiles]); setReferenceImagePreviews(p => [...p, ...newFiles.map(URL.createObjectURL)]); } };
    const removeReferenceImage = (index: number) => { URL.revokeObjectURL(referenceImagePreviews[index]); setReferenceImages(p => p.filter((_, i) => i !== index)); setReferenceImagePreviews(p => p.filter((_, i) => i !== index)); };
    const handleDragEvents = (e: DragEvent<HTMLDivElement>, d: boolean) => { e.preventDefault(); e.stopPropagation(); setIsDragging(d); };
    const handleDrop = (e: DragEvent<HTMLDivElement>) => { handleDragEvents(e, false); handleOriginalImageSelect(e.dataTransfer.files?.[0]); };

    if (isLoading) return <p className="text-center mt-10">Загрузка...</p>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">Создать новый дизайн</h1>
            {errors.general && <div className="p-3 bg-red-100 text-red-800 rounded-md">{errors.general}</div>}
            {generationError && !errors.general && <div className="p-3 bg-red-100 text-red-800 rounded-md">{generationError}</div>}

            <Card>
                <h2 className="text-xl font-bold mb-4">1. Опишите проект</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="projectName" className="block text-sm font-medium mb-1">Название проекта</label>
                        <Input id="projectName" value={projectName} onChange={e => setProjectName(e.target.value)} />
                        {errors.projectName && <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>}
                    </div>
                    <div>
                        <label htmlFor="prompt" className="block text-sm font-medium mb-1">Ваши пожелания (промпт)</label>
                        <Textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} rows={3}/>
                    </div>
                </div>
            </Card>

            <Card>
                 <h2 className="text-xl font-bold mb-4">2. Загрузите изображения</h2>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Основное изображение *</label>
                         <input type="file" id="original-image-upload" className="hidden" onChange={(e) => handleOriginalImageSelect(e.target.files?.[0])} accept="image/*" />
                         {originalImagePreview ? (
                             <div className="relative"><img src={originalImagePreview} alt="Превью" className="w-full h-auto max-h-80 object-contain rounded-md border" /><Button variant="danger" size="sm" onClick={() => { setOriginalImage(null); setOriginalImagePreview(null); }} className="absolute top-2 right-2">Удалить</Button></div>
                         ) : (
                             <div onClick={() => document.getElementById('original-image-upload')?.click()} onDragEnter={(e) => handleDragEvents(e, true)} onDragLeave={(e) => handleDragEvents(e, false)} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md cursor-pointer transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}><FileIcon /><p className="mt-2 text-sm text-gray-500"><span className="font-semibold text-blue-600">Нажмите</span> или перетащите</p></div>
                         )}
                         {errors.originalImage && <p className="text-red-500 text-sm mt-1">{errors.originalImage}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Изображения-референсы (до 3)</label>
                        <input type="file" id="reference-upload" multiple className="hidden" onChange={(e) => handleReferenceImagesSelect(e.target.files)} accept="image/*" />
                        <div className="grid grid-cols-3 gap-2">
                            {referenceImagePreviews.map((p, i) => <div key={i} className="relative"><img src={p} className="w-full h-24 object-cover rounded-md" /><button onClick={() => removeReferenceImage(i)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">&times;</button></div>)}
                            {referenceImages.length < 3 && <div onClick={() => document.getElementById('reference-upload')?.click()} className="flex items-center justify-center h-24 border-2 border-dashed rounded-md cursor-pointer hover:border-gray-400"><span className="text-2xl text-gray-400">+</span></div>}
                        </div>
                    </div>
                 </div>
            </Card>

            <Card>
                <h2 className="text-xl font-bold mb-4">3. Выберите стиль *</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {styles.map(style => <button key={style.id} onClick={() => { setSelectedStyleId(style.id); setErrors(p => ({...p, style: undefined})); }} className={`p-4 border rounded-lg text-left transition-all ${selectedStyleId === style.id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}><p className="font-bold text-lg">{style.name}</p></button>)}
                </div>
                {errors.style && <p className="text-red-500 text-sm mt-2">{errors.style}</p>}
            </Card>
            
            <Card>
                <h2 className="text-xl font-bold mb-4">4. Выберите мебель и декор</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {furniture.map(item => <label key={item.id} className="flex items-center space-x-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50"><Input type="checkbox" className="h-4 w-4" checked={!!selectedFurniture[item.id]} onChange={() => setSelectedFurniture(p => ({...p, [item.id]: !p[item.id]}))} /><span>{item.name}</span></label>)}
                </div>
            </Card>
            
            <div className="flex justify-end pt-4">
                 <Button onClick={handleGenerate} disabled={generationStatus === 'loading'} size="lg">
                    {generationStatus === 'loading' ? 'Создание...' : 'Создать дизайн'}
                </Button>
            </div>
        </div>
    );
}
