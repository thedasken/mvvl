import { z } from 'zod';

export const personSchema = z.object({
  nik: z.string().min(1, 'NIK wajib diisi').regex(/^\d+$/, 'NIK hanya boleh berisi angka'),
  nama_lengkap: z.string().min(1, 'Nama Lengkap wajib diisi').trim(),
  jenis_kelamin: z.enum(['Laki-laki', 'Perempuan']).nullable().optional(),
  tanggal_lahir: z.string().nullable().optional(),
  alamat: z.string().nullable().optional(),
  negara: z.string().nullable().optional(),
});

export const personUpdateSchema = personSchema.omit({ nik: true }).partial();

export type PersonInput = z.infer<typeof personSchema>;
export type PersonUpdateInput = z.infer<typeof personUpdateSchema>;
