import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import { ServiceError } from '@/libs/error';
import { personsRoute } from '@/routes/persons';

const app = new Hono();
app.use(logger());

app.use(
  '*',
  cors({
    origin: process.env.ORIGIN_URL,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
  }),
);

app.route('/api/persons', personsRoute);

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
  });
});

app.onError((err, c) => {
  if (err instanceof ServiceError) return c.json({ error: err.message }, err.status);
  return c.json({ error: 'Internal server error' }, 500);
});

serve({ fetch: app.fetch, port: 3000 }, () => {
  console.log('API running on http://localhost:3000');
});
