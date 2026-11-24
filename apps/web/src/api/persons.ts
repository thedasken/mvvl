import { http } from '@/libs/http';
import type { Person, PersonInput, PersonListParams, PersonUpdateInput } from '@/types/person';

export const fetchPersons = async (params?: PersonListParams): Promise<Person[]> => {
  const { data: res } = await http.get<{ data: Person[] }>('/persons', { params });
  return res.data;
};

export const fetchPerson = async (nik: string): Promise<Person> => {
  const { data: res } = await http.get<{ data: Person }>('/persons/' + nik);
  return res.data;
};

export const createPerson = async (payload: PersonInput): Promise<Person> => {
  const { data: res } = await http.post<{ data: Person }>('/persons', payload);
  return res.data;
};

export const updatePerson = async (nik: string, payload: PersonUpdateInput): Promise<Person> => {
  const { data: res } = await http.put<{ data: Person }>('/persons/' + nik, payload);
  return res.data;
};

export const deletePerson = async (nik: string): Promise<void> => {
  await http.delete('/persons/' + nik);
};
