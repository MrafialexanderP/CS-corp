// API Constants Configuration
export const API_BASE_URL = 'https://cscorp.bgeodev.cloud/api';
export const STORAGE_BASE_URL = 'https://cscorp.bgeodev.cloud/storage';

// Production API Endpoints
export const PRODUCTION_API = {
  BASE: `${API_BASE_URL}/productions`,
  LIST: `${API_BASE_URL}/productions`,
  DETAIL: (id: number) => `${API_BASE_URL}/productions/${id}`,
};

// Visions API Endpoints
export const VISIONS_API = {
  BASE: `${API_BASE_URL}/visions`,
  LIST: `${API_BASE_URL}/visions`,
  DETAIL: (id: number) => `${API_BASE_URL}/visions/${id}`,
};

// Events API Endpoints (for images)
export const EVENTS_API = {
  BASE: `${API_BASE_URL}/events`,
  LIST: `${API_BASE_URL}/events`,
  DETAIL: (id: number) => `${API_BASE_URL}/events/${id}`,
};

// API Response Types
export interface ProductionImage {
  id: number;
  production_id: number;
  image: string;
  image_url?: string;  // Full URL from API
  created_at: string;
  updated_at: string;
}

export interface Production {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  client: string;
  created_at: string;
  updated_at: string;
  images: ProductionImage[];
}

export interface EventImage {
  id: number;
  event_id: number;
  image: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  judul: string;
  deskripsi: string;
  tanggal: string;
  client: string;
  created_at: string;
  updated_at: string;
  images: EventImage[];
}

export interface Vision {
  id: number;
  visi: string;       // Vision/Visi
  misi: string;       // Mission/Misi
  created_at: string;
  updated_at: string;
}

// Default timeout for API calls (in milliseconds)
export const API_TIMEOUT = 30000;

// Cache configuration
export const CACHE_DURATION = {
  PRODUCTIONS: 5 * 60 * 1000, // 5 minutes
  VISIONS: 5 * 60 * 1000, // 5 minutes
};

// Helper function to construct image URLs
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '/placeholder.svg';
  // If it already has a full URL, return as is
  if (imagePath.startsWith('https')) return imagePath;
  // Otherwise, construct the full URL from storage
  return `${STORAGE_BASE_URL}/app/public/${imagePath}`;
};
