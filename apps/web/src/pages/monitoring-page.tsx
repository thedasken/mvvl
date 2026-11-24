import { Plus, RotateCcw, Search } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { DeleteModal } from '@/components/delete-modal';
import { PersonTable } from '@/components/person-table';
import { Panic } from '@/components/placeholders/error';
import { Loading } from '@/components/placeholders/loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDeletePerson, usePersons } from '@/hooks/use-person';
import type { Person, PersonSortOrder } from '@/types/person';

interface SearchForm {
  nik?: string;
  nama?: string;
}

const INITIAL: SearchForm = {
  nik: '',
  nama: '',
};

export function MonitoringPage() {
  const navigate = useNavigate();
  const deleteMutation = useDeletePerson();
  const [search, setSearch] = React.useState<SearchForm>(INITIAL);
  const [selected, setSelected] = React.useState<Person | null>(null);
  const [sortOrder, setSortOrder] = React.useState<PersonSortOrder | undefined>(undefined);

  const { register, handleSubmit, reset } = useForm<SearchForm>();
  const {
    data,
    isLoading: loading,
    isError: error,
  } = usePersons({
    ...search,
    sort: sortOrder ? 'nama' : undefined,
    order: sortOrder,
  });
  const changed = search.nik || search.nama;

  const onSearchSubmit = (data: SearchForm) => {
    setSearch({
      nik: data.nik ? data.nik.trim() : undefined,
      nama: data.nama ? data.nama.trim() : undefined,
    });
  };

  const handleReset = () => {
    reset();
    setSearch(INITIAL);
  };

  // Cycle : aucun → A→Z → Z→A → aucun. Le tri n'est pas réinitialisé par Reset.
  const handleNamaSortClick = () => {
    setSortOrder((prev) => (prev === undefined ? 'asc' : prev === 'asc' ? 'desc' : undefined));
  };

  const handleConfirmDelete = () => {
    if (!selected) return;
    deleteMutation.mutate(selected.nik, {
      onSuccess: () => setSelected(null),
    });
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className='flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between'>
        <div className='flex flex-col gap-3 lg:flex-row lg:items-end'>
          <div>
            <Label htmlFor={register('nik').name}>NIK</Label>
            <Input type='text' {...register('nik')} placeholder='Masukkan NIK' />
          </div>
          <div>
            <Label htmlFor={register('nama').name}>Nama</Label>
            <Input type='text' {...register('nama')} placeholder='Masukkan nama' />
          </div>

          <Button type='submit' variant='primary'>
            <span>Search</span>
            <Search size={16} />
          </Button>

          {changed && (
            <Button type='button' variant='secondary' onClick={handleReset}>
              <span>Reset</span>
              <RotateCcw size={16} />
            </Button>
          )}
        </div>

        <Button type='button' variant='accent' onClick={() => navigate('/add')}>
          <span>Tambah Data</span>
          <Plus size={16} />
        </Button>
      </form>

      {loading && <Loading />}
      {error && <Panic>Gagal memuat data.</Panic>}

      {!loading && !error && (
        <PersonTable
          persons={data ?? []}
          sortOrder={sortOrder}
          onNamaSortClick={handleNamaSortClick}
          onDeleteClick={setSelected}
        />
      )}
      {selected && (
        <DeleteModal
          person={selected}
          onConfirm={handleConfirmDelete}
          onCancel={() => setSelected(null)}
          isLoading={deleteMutation.isPending}
        />
      )}
    </React.Fragment>
  );
}
