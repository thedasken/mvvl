import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const persons = sqliteTable('persons', {
  nik: text('nik').primaryKey(),
  nama_lengkap: text('nama_lengkap').notNull(),
  jenis_kelamin: text('jenis_kelamin'),
  tanggal_lahir: text('tanggal_lahir'),
  alamat: text('alamat'),
  negara: text('negara'),
});

export type Person = typeof persons.$inferSelect;
export type NewPerson = typeof persons.$inferInsert;
