import { eq, like, and } from 'drizzle-orm';

import { db } from '@/db/index';
import { schema } from '@/db/index';
import type { NewPerson, Person } from '@/db/schema';
import { ServiceError } from '@/libs/error';

const { persons } = schema;

export class PersonService {
  async findAll(filters: { nik?: string; nama?: string }): Promise<Person[]> {
    const conditions = [];
    if (filters.nik) conditions.push(like(persons.nik, `%${filters.nik}%`));
    if (filters.nama) conditions.push(like(persons.nama_lengkap, `%${filters.nama}%`));
    if (conditions.length === 0) return await db.select().from(persons).all();

    return await db
      .select()
      .from(persons)
      .where(and(...conditions))
      .all();
  }

  async findByNik(nik: string): Promise<Person> {
    const row = await db.select().from(persons).where(eq(persons.nik, nik)).get();
    if (!row) throw new ServiceError('Data tidak ditemukan', 404);
    return row;
  }

  async create(data: NewPerson): Promise<Person> {
    const existing = await db.select().from(persons).where(eq(persons.nik, data.nik)).get();
    if (existing) throw new ServiceError('NIK sudah terdaftar', 409);

    await db.insert(persons).values(data).run();
    return data as Person;
  }

  async update(nik: string, data: Partial<Person>): Promise<Person> {
    const existing = await this.findByNik(nik);

    const updated: Partial<Person> = {
      nama_lengkap: data.nama_lengkap ?? existing.nama_lengkap,
      jenis_kelamin: data.jenis_kelamin ?? existing.jenis_kelamin,
      tanggal_lahir: data.tanggal_lahir ?? existing.tanggal_lahir,
      alamat: data.alamat ?? existing.alamat,
      negara: data.negara ?? existing.negara,
    } as Partial<Person>;

    const [result] = await db.update(persons).set(updated).where(eq(persons.nik, nik)).returning();

    return result;
  }

  async delete(nik: string): Promise<{ message: string }> {
    await this.findByNik(nik);
    await db.delete(persons).where(eq(persons.nik, nik)).run();
    return { message: 'Data berhasil dihapus' };
  }
}

export const personService = new PersonService();
