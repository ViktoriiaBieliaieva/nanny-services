import { get, ref } from 'firebase/database';
import { database } from './firebase';
import { NannyFromDb } from '@/types/nanny';

export async function getNannies() {
  const snapshot = await get(ref(database, 'nannies'));
  const data = snapshot.val() as Record<string, NannyFromDb> | null;

  if (!data) {
    return [];
  }
  return Object.entries(data).map(([id, nanny]) => ({
    id,
    ...nanny,
  }));
}
