import { AlertTriangle, BookOpen, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { calculateAge, formatDate } from '@/libs/utils';

import type { Person } from '../types/person';
import { IconButton } from './ui/icon-button';

type Props = {
  persons: Person[];
  onDeleteClick: (person: Person) => void;
};

export const PersonTable: React.FC<Props> = ({ persons, onDeleteClick }) => {
  const navigate = useNavigate();

  return (
    <div className='overflow-hidden overflow-x-auto rounded-xl border'>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>NIK</th>
            <th>Nama Lengkap</th>
            <th>Umur</th>
            <th>Tanggal Lahir</th>
            <th>Jenis Kelamin</th>
            <th>Alamat</th>
            <th>Negara</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {persons.length === 0 && (
            <tr>
              <td colSpan={9}>
                <div className='flex h-40 items-center justify-center gap-2'>
                  <AlertTriangle size={16} className='text-destructive' />
                  <span className='text-sm'>Data tidak ditemukan</span>
                </div>
              </td>
            </tr>
          )}

          {persons.map((emp, idx) => (
            <tr key={emp.nik}>
              <td>{idx + 1}</td>
              <td>{emp.nik}</td>
              <td>{emp.nama_lengkap}</td>
              <td>{emp.tanggal_lahir && calculateAge(emp.tanggal_lahir)}</td>
              <td>{emp.tanggal_lahir && formatDate(emp.tanggal_lahir)}</td>
              <td>{emp.jenis_kelamin}</td>
              <td>{emp.alamat}</td>
              <td>{emp.negara}</td>

              <td className='flex items-center'>
                <IconButton
                  variant='ghost'
                  title='View Detail'
                  onClick={() => navigate('/detail/' + emp.nik)}>
                  <BookOpen size={16} />
                </IconButton>

                <IconButton
                  variant='ghost'
                  title='Edit data'
                  onClick={() => navigate('/edit/' + emp.nik)}
                  className='mx-2'>
                  <Pencil size={16} />
                </IconButton>

                <IconButton
                  variant='destructive'
                  title='Delete data'
                  onClick={() => onDeleteClick(emp)}>
                  <Trash2 size={16} />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
