// API Constants Configuration
export const API_BASE_URL =
  (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_BASE_URL : undefined) ||
  'https://cscorp.bgeodev.cloud/api';
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

// Structurals API Endpoints
export const STRUCTURALS_API = {
  BASE: `${API_BASE_URL}/structurals`,
  LIST: `${API_BASE_URL}/structurals`,
  DETAIL: (id: number) => `${API_BASE_URL}/structurals/${id}`,
};

// Contacts API Endpoints
export const CONTACTS_API = {
  BASE: `${API_BASE_URL}/contacs`,
  LIST: `${API_BASE_URL}/contacs`,
};

// Sosmeds API Endpoints
export const SOSMEDS_API = {
  BASE: `${API_BASE_URL}/sosmeds`,
  LIST: `${API_BASE_URL}/sosmeds`,
};

// Contact form message API endpoint
export const CONTACT_MESSAGE_API = `${API_BASE_URL}/send-message`;

export interface Client {
  id: number;
  nama_client: string;
  icon: string; // filename only
  icon_url?: string; // Full URL from API
  created_at: string;
  updated_at: string;
}

// Clients API Endpoints
export const CLIENTS_API = {
  BASE: `${API_BASE_URL}/clients`,
  LIST: `${API_BASE_URL}/clients`,
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

export interface StructuralSkill {
  id: number;
  structural_id: number;
  pengalaman: string;
  created_at: string;
  updated_at: string;
}

export interface StructuralSosmed {
  id: number;
  structural_id: number;
  nama_sosmed: string;
  icon_class: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface Structural {
  id: number;
  nama: string;
  jabatan: string;
  image: string;
  image_url?: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  skills: StructuralSkill[];
  sosmeds: StructuralSosmed[];
}

export interface Contact {
  id: number;
  whatsapp: string;
  email: string;
  working_hours: string;
  created_at: string;
  updated_at: string;
}

export interface Sosmed {
  id: number;
  nama_sosmed: string;
  url: string;
  icon: string | null;
  icon_class: string;
  created_at: string;
  updated_at: string;
}

// Contact form payload/response types
export interface ContactMessageRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactMessageResponse {
  success: boolean;
  message: string;
}

// Default timeout for API calls (in milliseconds)
export const API_TIMEOUT = 30000;

// Cache configuration
export const CACHE_DURATION = {
  PRODUCTIONS: 5 * 60 * 1000, // 5 minutes
  VISIONS: 5 * 60 * 1000, // 5 minutes
};

// Helper function to construct image URLs
export const getImageUrl = (imagePath: string | undefined, imageUrl?: string): string => {
  // Prefer image_url if provided (full URL from API)
  if (imageUrl) return imageUrl;
  if (!imagePath) return '/placeholder.svg';
  // If it already has a full URL, return as is
  if (imagePath.startsWith('https')) return imagePath;
  // Otherwise, construct the full URL from storage
  return `${STORAGE_BASE_URL}/${imagePath}`;
};
