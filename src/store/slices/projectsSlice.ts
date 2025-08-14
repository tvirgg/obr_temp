import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../lib/api';

// --- Типы ---
interface Project {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  originalImageUrl: string;
  generatedImageUrl: string | null;
  style: {
    id: string;
    name: string;
    slug: string;
  };
}

interface ProjectsState {
  items: Project[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectsState = {
  items: [],
  status: 'idle',
  error: null,
};

// --- Async Thunks ---
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Не удалось загрузить проекты');
  }
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId: string, { rejectWithValue }) => {
  try {
    await api.delete(`/projects/${projectId}`);
    return projectId;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Не удалось удалить проект');
  }
});

interface CreateProjectPayload {
    projectName: string;
    prompt: string;
    originalImage: File;
    referenceImages: File[];
    selectedStyleId: string;
    checklist: { itemId: string }[];
}

export const createAndGenerateProject = createAsyncThunk(
    'projects/createAndGenerate', 
    async (payload: CreateProjectPayload, { dispatch, rejectWithValue }) => {
        try {
            const { projectName, prompt, originalImage, referenceImages, selectedStyleId, checklist } = payload;
            
            const uploadFormData = new FormData();
            uploadFormData.append('originalImage', originalImage);
            referenceImages.forEach(file => uploadFormData.append('referenceImages', file));
            const uploadRes = await api.post('/uploads/project-images', uploadFormData);
            const { originalImageUrl, referenceImageUrls } = uploadRes.data;

            const projectRes = await api.post('/projects', {
                name: projectName,
                styleId: selectedStyleId,
                originalImageUrl,
                referenceImageUrls,
            });
            const { id: projectId } = projectRes.data;

            await api.post('/generate', { projectId, prompt, checklist });
            
            // --- КЛЮЧЕВОЕ ИЗМЕНЕНИЕ ---
            // Вместо возврата данных, запускаем полное обновление списка.
            dispatch(fetchProjects());

        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при создании проекта');
        }
    }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.status = 'succeeded';
        state.items = action.payload; // Теперь список обновляется здесь
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Delete Project
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      // Create and Generate Project
      .addCase(createAndGenerateProject.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createAndGenerateProject.fulfilled, (state) => {
        // --- КЛЮЧЕВОЕ ИЗМЕНЕНИЕ ---
        // Больше не добавляем проект вручную.
        // Статус перейдет в 'loading' из-за вызова fetchProjects, что является корректным поведением.
        state.status = 'succeeded';
      })
      .addCase(createAndGenerateProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
