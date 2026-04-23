export type { PersonInput, PersonUpdateInput } from '@app/shared';

export type Person = {
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: 'Laki-laki' | 'Perempuan' | null;
  tanggal_lahir: string | null;
  alamat: string | null;
  negara: string | null;
};
