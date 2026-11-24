export type { PersonInput, PersonUpdateInput, Person } from '@app/shared';

export type PersonSortOrder = 'asc' | 'desc';

export type PersonListParams = {
  nik?: string;
  nama?: string;
  sort?: 'nama';
  order?: PersonSortOrder;
};
