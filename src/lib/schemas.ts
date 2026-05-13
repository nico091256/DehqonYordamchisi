import { z } from 'zod';

export const loginSchema = z.object({
  phone: z.string()
    .transform((val) => val.replace(/\s+/g, ''))
    .refine((val) => /^\+998\d{9}$/.test(val), 'Telefon raqam +998XXXXXXXXX formatida bo\'lishi kerak'),
  password: z.string().min(1, 'Parolni kiriting'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak'),
  phone: z.string()
    .transform((val) => val.replace(/\s+/g, ''))
    .refine((val) => /^\+998\d{9}$/.test(val), 'Telefon raqam +998XXXXXXXXX formatida bo\'lishi kerak'),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak'),
  role: z.enum(['BUYER', 'FARMER']),
  region: z.string().min(1, 'Viloyatni tanlang'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
