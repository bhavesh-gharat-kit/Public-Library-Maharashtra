// utils/fonts.js
import { Cinzel, Geist, Geist_Mono, Lora, Playfair_Display } from 'next/font/google';

export const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const geistSans = Geist({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400'], 
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'], 
});