import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api.service';

// Types for API responses
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Query keys
export const queryKeys = {
  projects: ['projects'] as const,
  project: (id: string) => ['projects', id] as const,
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  health: ['health'] as const,
} as const;

// Health check hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: () => apiClient.healthCheck(),
    refetchInterval: 30000, // Check every 30 seconds
    retry: 3,
  });
};

// Projects hooks
export const useProjects = () => {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: () => apiClient.get<ApiResponse<Project[]>>('/api/projects'),
    select: data => data.data,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: queryKeys.project(id),
    queryFn: () => apiClient.get<ApiResponse<Project>>(`/api/projects/${id}`),
    select: data => data.data,
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) =>
      apiClient.post<ApiResponse<Project>>('/api/projects', projectData),
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Project> & { id: string }) =>
      apiClient.put<ApiResponse<Project>>(`/api/projects/${id}`, data),
    onSuccess: (data, variables) => {
      // Update the specific project in cache
      queryClient.setQueryData(queryKeys.project(variables.id), data);
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete<ApiResponse<void>>(`/api/projects/${id}`),
    onSuccess: () => {
      // Invalidate projects list
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
};

// Users hooks
export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: () => apiClient.get<ApiResponse<User[]>>('/api/users'),
    select: data => data.data,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => apiClient.get<ApiResponse<User>>(`/api/users/${id}`),
    select: data => data.data,
    enabled: !!id,
  });
};

// Current user profile hook
export const useCurrentUserProfile = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => apiClient.get<ApiResponse<User>>('/api/users/me'),
    select: data => data.data,
  });
};
