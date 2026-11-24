import { personSchema, personUpdateSchema } from '@app/shared';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import type { Context } from 'hono';

import { ServiceError } from '@/libs/error';
import { personService } from '@/services/person.service';

export const personsRoute = new Hono();

const handleServiceError = (error: unknown, c: Context) => {
  if (error instanceof ServiceError) return c.json({ error: error.message }, error.status);
  console.error('Unhandled service error:', error);
  return c.json({ error: 'Internal server error' }, 500);
};

const SORT_VALUES = ['nama'] as const;
const ORDER_VALUES = ['asc', 'desc'] as const;

personsRoute.get('/', async (c) => {
  const nik = c.req.query('nik');
  const nama = c.req.query('nama');
  const sort = c.req.query('sort');
  const order = c.req.query('order');

  if (sort !== undefined && !(SORT_VALUES as readonly string[]).includes(sort)) {
    return c.json({ error: `Nilai sort tidak valid: "${sort}". Pilihan: nama` }, 400);
  }
  if (order !== undefined && !(ORDER_VALUES as readonly string[]).includes(order)) {
    return c.json({ error: `Nilai order tidak valid: "${order}". Pilihan: asc, desc` }, 400);
  }

  const data = await personService.findAll({
    nik,
    nama,
    sort: sort as 'nama' | undefined,
    order: (order ?? 'asc') as 'asc' | 'desc',
  });
  return c.json({ data });
});

personsRoute.get('/:nik', async (c) => {
  const nik = c.req.param('nik');
  try {
    const data = await personService.findByNik(nik);
    return c.json({ data });
  } catch (e) {
    return handleServiceError(e, c);
  }
});

personsRoute.post(
  '/',
  zValidator('json', personSchema, (result, c) => {
    if (!result.success) return c.json({ error: result.error.errors[0].message }, 400);
  }),
  async (c) => {
    const body = c.req.valid('json');
    try {
      const data = await personService.create(body);
      return c.json({ data }, 201);
    } catch (e) {
      return handleServiceError(e, c);
    }
  },
);

personsRoute.put(
  '/:nik',
  zValidator('json', personUpdateSchema, (result, c) => {
    if (!result.success) return c.json({ error: result.error.errors[0].message }, 400);
  }),
  async (c) => {
    const nik = c.req.param('nik');
    const body = c.req.valid('json');
    try {
      const data = await personService.update(nik, body);
      return c.json({ data });
    } catch (e) {
      return handleServiceError(e, c);
    }
  },
);

personsRoute.delete('/:nik', async (c) => {
  const nik = c.req.param('nik');
  try {
    const data = await personService.delete(nik);
    return c.json({ data });
  } catch (e) {
    return handleServiceError(e, c);
  }
});
