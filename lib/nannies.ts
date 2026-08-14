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

export function getAge(birthday: string) {
  const birthDate = new Date(birthday);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const birthdayHasNotPassedYet =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

  if (birthdayHasNotPassedYet) {
    age -= 1;
  }

  return age;
}
