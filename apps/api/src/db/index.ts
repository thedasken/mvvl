import 'dotenv/config';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

import * as schema from '@/db/schema';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is not set in environment');

const client = createClient({ url });
export const db = drizzle(client, { schema });
await migrate(db, {
  migrationsFolder: './drizzle',
});

export { schema };
