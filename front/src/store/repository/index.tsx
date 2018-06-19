import { firebaseDb, firebaseStorage } from '../../firebase';

export async function update(updates: any) {
  await firebaseDb.ref().update(updates);
}

export async function fetchNewKeyString() {
  return await firebaseDb.ref(`events`).push().key;
}

export async function fetchDataFromGivenPass(path: string) {
  return (await firebaseDb.ref(path).once('value')).val();
}

export async function storeDataToGivenPass(path: string, value: any) {
  await firebaseDb.ref(path).set({
    ...value,
  });
}

export async function updateUserImage(
  id: string,
  fileName: any,
  photoFileInstance: {}
) {
  const imageRef = firebaseStorage.ref().child(`${id}/${fileName}`);
  await imageRef.put(photoFileInstance);
  return await imageRef.getDownloadURL();
}

export async function updateProfile(
  user: any,
  displayName: string,
  photoURL: string
) {
  await user.updateProfile({
    displayName,
    photoURL,
  });
}
