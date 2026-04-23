import { useParams } from 'react-router-dom';

import { PersonForm } from '@/components/person-form';
import { Panic } from '@/components/placeholders/error';
import { Loading } from '@/components/placeholders/loading';
import { usePerson } from '@/hooks/use-person';

export function DetailPage() {
  const { nik } = useParams<{ nik: string }>();
  const { data, isLoading: loading, isError: error } = usePerson(nik);

  if (loading) return <Loading />;
  if (error || !data) return <Panic>Data tidak ditemukan.</Panic>;

  return <PersonForm type='detail' title='Detail Data Pribadi' defaultValues={data} />;
}
