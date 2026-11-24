import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPerson, deletePerson, fetchPerson, fetchPersons, updatePerson } from '@/api/persons';
import type { PersonInput, PersonListParams, PersonUpdateInput } from '@/types/person';

export const usePersons = (params?: PersonListParams) => {
  return useQuery({
    queryKey: ['persons', params],
    queryFn: () => fetchPersons(params),
    // Garde le tableau affiché quand seul le tri change : sinon le clic sur l'en-tête
    // démonte le bouton focalisé. Une recherche (nik/nama) garde le comportement de chargement.
    placeholderData: (previousData, previousQuery) => {
      const prev = previousQuery?.queryKey[1] as PersonListParams | undefined;
      return prev?.nik === params?.nik && prev?.nama === params?.nama ? previousData : undefined;
    },
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
