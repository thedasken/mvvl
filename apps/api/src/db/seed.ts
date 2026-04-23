import { db } from '@/db/index';
import { persons } from '@/db/schema';

await db
  .insert(persons)
  .values([
    {
      nik: '3370056987450001',
      nama_lengkap: 'Lionel Messi',
      jenis_kelamin: 'Laki-laki',
      tanggal_lahir: '1987-06-24',
      alamat: 'Jl. Achmad Yani No 89 Jakarta Pusat',
      negara: 'Argentina',
    },
    {
      nik: '3370056983690002',
      nama_lengkap: 'Cristiano Ronaldo',
      jenis_kelamin: 'Laki-laki',
      tanggal_lahir: '1985-02-05',
      alamat: 'Jl. Achmad Yani No 78 Jakarta Pusat',
      negara: 'Portugal',
    },
    {
      nik: '3370056987450003',
      nama_lengkap: 'Bambang Pamungkas',
      jenis_kelamin: 'Laki-laki',
      tanggal_lahir: '1984-06-10',
      alamat: 'Jl. Achmad Yani No 67 Jakarta Pusat',
      negara: 'Indonesia',
    },
    {
      nik: '3370056987450004',
      nama_lengkap: 'Natasha Romanov',
      jenis_kelamin: 'Perempuan',
      tanggal_lahir: '1989-07-04',
      alamat: 'Jl. Achmad Yani No 56 Jakarta Pusat',
      negara: 'Rusia',
    },
    {
      nik: '3370056987450005',
      nama_lengkap: 'Entis Siti Jubaidah',
      jenis_kelamin: 'Perempuan',
      tanggal_lahir: '1992-01-05',
      alamat: 'Jl. Achmad Yani No 45 Jakarta Pusat',
      negara: 'Malaysia',
    },
  ])
  .onConflictDoNothing()
  .run();

console.log('Seed complete.');
