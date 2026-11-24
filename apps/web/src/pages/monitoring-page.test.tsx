import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchPersons } from '@/api/persons';

import { MonitoringPage } from './monitoring-page';

vi.mock('@/api/persons', () => ({
  fetchPersons: vi.fn(),
  fetchPerson: vi.fn(),
  createPerson: vi.fn(),
  updatePerson: vi.fn(),
  deletePerson: vi.fn(),
}));

const renderPage = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <MemoryRouter>
        <MonitoringPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

const namaHeader = () => screen.getByRole('columnheader', { name: /Nama Lengkap/ });
const namaButton = () => within(namaHeader()).getByRole('button');
const lastParams = () => vi.mocked(fetchPersons).mock.lastCall?.[0];

describe('MonitoringPage — tri par Nama Lengkap', () => {
  beforeEach(() => {
    vi.mocked(fetchPersons).mockReset();
    vi.mocked(fetchPersons).mockResolvedValue([]);
  });

  it('enchaîne aucun → A→Z → Z→A → aucun, puis revient à A→Z au quatrième clic', async () => {
    renderPage();
    await screen.findByRole('columnheader', { name: /Nama Lengkap/ });
    expect(namaHeader().getAttribute('aria-sort')).toBe('none');
    expect(lastParams()?.sort).toBeUndefined();

    fireEvent.click(namaButton());
    await waitFor(() => expect(lastParams()).toMatchObject({ sort: 'nama', order: 'asc' }));
    expect(namaHeader().getAttribute('aria-sort')).toBe('ascending');

    fireEvent.click(namaButton());
    await waitFor(() => expect(lastParams()).toMatchObject({ sort: 'nama', order: 'desc' }));
    expect(namaHeader().getAttribute('aria-sort')).toBe('descending');

    fireEvent.click(namaButton());
    await waitFor(() => expect(lastParams()?.sort).toBeUndefined());
    expect(namaHeader().getAttribute('aria-sort')).toBe('none');

    fireEvent.click(namaButton());
    await waitFor(() => expect(lastParams()).toMatchObject({ sort: 'nama', order: 'asc' }));
    expect(namaHeader().getAttribute('aria-sort')).toBe('ascending');
  });

  it("affiche l'icône correspondant à chaque état", async () => {
    renderPage();
    await screen.findByRole('columnheader', { name: /Nama Lengkap/ });
    expect(namaHeader().querySelector('.lucide-arrow-up-down')).not.toBeNull();

    fireEvent.click(namaButton());
    await waitFor(() => expect(namaHeader().querySelector('.lucide-arrow-up')).not.toBeNull());

    fireEvent.click(namaButton());
    await waitFor(() => expect(namaHeader().querySelector('.lucide-arrow-down')).not.toBeNull());
  });

  it('conserve le tri quand on clique sur Reset', async () => {
    renderPage();
    await screen.findByRole('columnheader', { name: /Nama Lengkap/ });

    fireEvent.change(screen.getByPlaceholderText('Masukkan NIK'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Search/ }));
    await waitFor(() => expect(lastParams()?.nik).toBe('123'));
    await screen.findByRole('columnheader', { name: /Nama Lengkap/ });

    fireEvent.click(namaButton());
    await waitFor(() => expect(lastParams()).toMatchObject({ sort: 'nama', order: 'asc' }));

    fireEvent.click(screen.getByRole('button', { name: /Reset/ }));
    await waitFor(() => expect(lastParams()?.nik).toBeFalsy());
    expect(lastParams()).toMatchObject({ sort: 'nama', order: 'asc' });
    await screen.findByRole('columnheader', { name: /Nama Lengkap/ });
    expect(namaHeader().getAttribute('aria-sort')).toBe('ascending');
  });

  it('ne rend cliquables que les en-têtes Nama Lengkap', async () => {
    renderPage();
    await screen.findByRole('columnheader', { name: /Nama Lengkap/ });

    const others = [
      'No',
      'NIK',
      'Umur',
      'Tanggal Lahir',
      'Jenis Kelamin',
      'Alamat',
      'Negara',
      'Action',
    ];
    for (const name of others) {
      const header = screen.getByRole('columnheader', { name });
      expect(within(header).queryByRole('button')).toBeNull();
      expect(header.hasAttribute('aria-sort')).toBe(false);
      fireEvent.click(header);
    }
    expect(lastParams()?.sort).toBeUndefined();
  });

  it("n'applique pas le tri quand on lance une recherche sans changer le tri", async () => {
    renderPage();
    await screen.findByRole('columnheader', { name: /Nama Lengkap/ });
    fireEvent.click(namaButton());
    await waitFor(() => expect(lastParams()).toMatchObject({ sort: 'nama', order: 'asc' }));

    fireEvent.change(screen.getByPlaceholderText('Masukkan nama'), { target: { value: 'Budi' } });
    fireEvent.click(screen.getByRole('button', { name: /Search/ }));
    await waitFor(() => expect(lastParams()?.nama).toBe('Budi'));
    expect(lastParams()).toMatchObject({ sort: 'nama', order: 'asc' });
  });
});
