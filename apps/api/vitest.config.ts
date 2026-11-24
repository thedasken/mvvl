import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // Défini avant le chargement de `src/db/index.ts` : la base de test est en mémoire
    // et `data.db` n'est jamais ouvert pendant les tests.
    env: {
      DATABASE_URL: ':memory:',
    },
  },
});
