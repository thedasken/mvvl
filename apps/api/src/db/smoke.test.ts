import { sql } from 'drizzle-orm';
import { describe, expect, it } from 'vitest';

import { db, schema } from '@/db/index';

describe('infrastructure de test', () => {
  it('utilise une base en mémoire', () => {
    expect(process.env.DATABASE_URL).toBe(':memory:');
  });

  it('applique les migrations sur la base en mémoire', async () => {
    const rows = await db.all<{ name: string }>(
      sql`SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'persons'`,
    );

    expect(rows.map((row) => row.name)).toEqual(['persons']);
  });

  it('répond aux requêtes', async () => {
    const persons = await db.select().from(schema.persons);

    expect(persons).toEqual([]);
  });
});
