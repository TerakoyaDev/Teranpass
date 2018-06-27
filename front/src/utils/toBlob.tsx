export function toBlobFromBase64(base64: string) {
  const bin = atob(base64.replace(/^.*,/, ''));
  const buffer = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
  }
  let blob;
  // Blobを作成
  try {
    blob = new Blob([buffer.buffer], {
      type: 'image/png',
    });
  } catch (e) {
    return false;
  }
  return blob;
}
