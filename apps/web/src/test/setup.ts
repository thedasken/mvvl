import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Les globals Vitest sont désactivés : Testing Library ne nettoie pas le DOM automatiquement.
afterEach(() => {
  cleanup();
});
