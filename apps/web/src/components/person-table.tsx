import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BookOpen,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { calculateAge, formatDate } from '@/libs/utils';

import type { Person, PersonSortOrder } from '../types/person';
import { IconButton } from './ui/icon-button';

type Props = {
  persons: Person[];
  sortOrder?: PersonSortOrder;
  onNamaSortClick: () => void;
  onDeleteClick: (person: Person) => void;
};

const SORT_ICON = {
  asc: ArrowUp,
  desc: ArrowDown,
} as const;

export const PersonTable: React.FC<Props> = ({
  persons,
  sortOrder,
  onNamaSortClick,
  onDeleteClick,
}) => {
  const navigate = useNavigate();
  const SortIcon = sortOrder ? SORT_ICON[sortOrder] : ArrowUpDown;
  const ariaSort = sortOrder === 'asc' ? 'ascending' : sortOrder === 'desc' ? 'descending' : 'none';

  return (
    <div className='overflow-hidden overflow-x-auto rounded-xl border'>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>NIK</th>
            <th aria-sort={ariaSort}>
              <button type='button' onClick={onNamaSortClick} className='flex items-center gap-1'>
                <span>Nama Lengkap</span>
                <SortIcon size={14} />
              </button>
            </th>
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
