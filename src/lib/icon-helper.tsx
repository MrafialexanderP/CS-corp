import { Instagram, Linkedin, Facebook, Twitter, Youtube, Globe } from 'lucide-react';
import { ComponentType } from 'react';

/**
 * Maps Filament/FontAwesome icon classes to Lucide React icons
 */
export const getSocialIcon = (iconClass: string, namaSosmed: string): ComponentType<{ className?: string }> => {
  const classLower = iconClass.toLowerCase();
  const namaLower = namaSosmed.toLowerCase();

  // Check icon class first
  if (classLower.includes('instagram')) return Instagram;
  if (classLower.includes('linkedin')) return Linkedin;
  if (classLower.includes('facebook')) return Facebook;
  if (classLower.includes('twitter') || classLower.includes('x-twitter')) return Twitter;
  if (classLower.includes('youtube')) return Youtube;

  // Fallback to nama_sosmed
  if (namaLower.includes('instagram')) return Instagram;
  if (namaLower.includes('linkedin')) return Linkedin;
  if (namaLower.includes('facebook')) return Facebook;
  if (namaLower.includes('twitter') || namaLower.includes('x')) return Twitter;
  if (namaLower.includes('youtube')) return Youtube;

  // Default fallback
  return Globe;
};

