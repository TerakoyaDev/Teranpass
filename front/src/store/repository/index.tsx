import { firebaseDb } from '../../firebase';

export async function update(updates: any) {
  await firebaseDb.ref().update(updates);
}

export async function fetchNewKeyString() {
  return await firebaseDb.ref(`events`).push().key;
}

export async function fetchDataFromGivenPass(path: string) {
  return (await firebaseDb.ref(path).once('value')).val();
}
