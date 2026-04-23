import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPerson, deletePerson, fetchPerson, fetchPersons, updatePerson } from '@/api/persons';
import type { PersonInput, PersonUpdateInput } from '@/types/person';

export const usePersons = (params?: { nik?: string; nama?: string }) => {
  return useQuery({
    queryKey: ['persons', params],
    queryFn: () => fetchPersons(params),
  });
};

export const usePerson = (nik: string | undefined) => {
  return useQuery({
    queryKey: ['persons', nik],
    queryFn: () => fetchPerson(nik as string),
    enabled: !!nik,
  });
};

export const useCreatePerson = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: PersonInput) => createPerson(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['persons'] });
    },
  });
};

export const useUpdatePerson = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ nik, payload }: { nik: string; payload: PersonUpdateInput }) => {
      return updatePerson(nik, payload);
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['persons'] });
      qc.invalidateQueries({ queryKey: ['persons', variables.nik] });
    },
  });
};

export const useDeletePerson = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (nik: string) => deletePerson(nik),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['persons'] });
    },
  });
};
