import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Loading } from './loading';

describe('Loading', () => {
  it('affiche le message de chargement', () => {
    render(<Loading />);

    expect(screen.getByText('Memuat data...').textContent).toBe('Memuat data...');
  });
});
