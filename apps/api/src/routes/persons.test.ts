import { beforeEach, describe, expect, it } from 'vitest';

import { db, schema } from '@/db/index';
import { personsRoute } from '@/routes/persons';

const { persons } = schema;

// Ordre d'insertion volontairement non alphabétique.
const fixtures = [
  { nik: '3', nama_lengkap: 'Citra' },
  { nik: '1', nama_lengkap: 'Éva' },
  { nik: '4', nama_lengkap: 'Bagas' },
  { nik: '2', nama_lengkap: 'eva' },
  { nik: '5', nama_lengkap: 'Zulkifli' },
];

const niksOf = async (query: string) => {
  const res = await personsRoute.request(`/${query}`);
  expect(res.status).toBe(200);
  const body = (await res.json()) as { data: { nik: string }[] };
  return body.data.map((person) => person.nik);
};

describe('GET /api/persons — tri par nama', () => {
  beforeEach(async () => {
    await db.delete(persons);
    await db.insert(persons).values(fixtures);
  });

  it('sort=nama&order=asc trie de A à Z, accents et casse ignorés, homonymes par NIK croissant', async () => {
    // Bagas, Citra, Éva(1) puis eva(2) : Éva et eva sont équivalents, départagés par NIK.
    expect(await niksOf('?sort=nama&order=asc')).toEqual(['4', '3', '1', '2', '5']);
  });

  it('sort=nama sans order utilise asc par défaut', async () => {
    expect(await niksOf('?sort=nama')).toEqual(['4', '3', '1', '2', '5']);
  });

  it('sort=nama&order=desc trie de Z à A, homonymes toujours par NIK croissant', async () => {
    expect(await niksOf('?sort=nama&order=desc')).toEqual(['5', '1', '2', '3', '4']);
  });

  it('se combine avec le filtre nama', async () => {
    // Zulkifli ne contient pas « a » : il est exclu avant le tri.
    expect(await niksOf('?sort=nama&order=desc&nama=a')).toEqual(['1', '2', '3', '4']);
  });

  it('se combine avec le filtre nik', async () => {
    expect(await niksOf('?sort=nama&order=asc&nik=5')).toEqual(['5']);
  });

  it('renvoie 400 pour une valeur de sort inconnue', async () => {
    const res = await personsRoute.request('/?sort=nik');
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: expect.any(String) });
  });

  it('renvoie 400 pour une valeur de order inconnue', async () => {
    const res = await personsRoute.request('/?sort=nama&order=up');
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: expect.any(String) });
  });
});

describe('GET /api/persons — sans sort', () => {
  beforeEach(async () => {
    await db.delete(persons);
    await db.insert(persons).values(fixtures);
  });

  it("renvoie la liste dans l'ordre d'insertion, comme avant", async () => {
    expect(await niksOf('')).toEqual(['3', '1', '4', '2', '5']);
  });

  it('ignore order sans sort', async () => {
    expect(await niksOf('?order=desc')).toEqual(['3', '1', '4', '2', '5']);
  });
});
