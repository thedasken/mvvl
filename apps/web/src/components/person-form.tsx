import { personSchema } from '@app/shared';
import type { PersonInput } from '@app/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Warning } from '@/components/ui/warning';
import { COUNTRIES } from '@/libs/constant';

type FormType = 'add' | 'edit' | 'detail';

type Props = {
  title: string;
  type: FormType;
  error?: string | null;
  loading?: boolean;
  defaultValues?: Partial<PersonInput>;
  onSubmit?: (payload: PersonInput) => void;
};

const LABELS: Record<FormType, string> = {
  add: 'Tambah Data',
  edit: 'Ubah Data',
  detail: 'Detail',
};

export const PersonForm: React.FC<Props> = ({
  title,
  type,
  loading,
  error,
  defaultValues,
  onSubmit,
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonInput>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      jenis_kelamin: 'Laki-laki',
      ...defaultValues,
    },
  });

  const detail = type === 'detail';
  const label = LABELS[type];

  return (
    <React.Fragment>
      <h2 className='font-medium'>{title}</h2>

      {error && (
        <div className='mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit((data) => onSubmit?.(data))} className='flex flex-col gap-6'>
        <div>
          <Label htmlFor={register('nik').name}>NIK</Label>
          <Input
            {...register('nik')}
            readOnly={type === 'detail' || type === 'edit'}
            placeholder='Masukkan NIK'
          />
          {errors.nik && <Warning>{errors.nik.message}</Warning>}
        </div>

        <div>
          <Label htmlFor={register('nama_lengkap').name}>Nama Lengkap</Label>
          <Input
            {...register('nama_lengkap')}
            readOnly={detail}
            placeholder='Masukkan Nama Lengkap'
          />
          {errors.nama_lengkap && <Warning>{errors.nama_lengkap.message}</Warning>}
        </div>

        <div>
          <Label htmlFor={register('jenis_kelamin').name}>Jenis Kelamin</Label>
          <div className='flex items-center gap-4'>
            <Switch
              type='radio'
              {...register('jenis_kelamin')}
              disabled={type === 'detail'}
              value='Laki-laki'>
              Laki-laki
            </Switch>

            <Switch
              type='radio'
              {...register('jenis_kelamin')}
              disabled={type === 'detail'}
              value='Perempuan'>
              Perempuan
            </Switch>
          </div>
        </div>

        <div>
          <Label htmlFor={register('tanggal_lahir').name}>Tanggal Lahir</Label>
          <Input
            {...register('tanggal_lahir')}
            type='date'
            readOnly={detail}
            placeholder='Masukkan Tanggal Lahir'
          />
        </div>

        <div>
          <Label htmlFor={register('alamat').name}>Alamat</Label>
          <Textarea {...register('alamat')} readOnly={detail} rows={3} />
        </div>

        <div>
          <Label>Negara</Label>
          <Select {...register('negara')} disabled={type === 'detail'}>
            <option value=''>Pilih Negara</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
        </div>

        <div className='flex flex-col gap-3 lg:flex-row lg:justify-end'>
          <Button type='button' variant='secondary' onClick={() => navigate('/')}>
            <span>Kembali</span>
          </Button>

          {type !== 'detail' && (
            <Button variant='accent' type='submit' disabled={loading}>
              {loading && <Loader2 size={16} className='animate-spin' />}
              <span>{label}</span>
              {!loading && <ArrowUpRight size={16} />}
            </Button>
          )}
        </div>
      </form>
    </React.Fragment>
  );
};
