import CryptoJS from 'crypto-js';

export const getFileHash = (blob: Blob): string => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  const wordArray = CryptoJS.lib.WordArray.create(reader.result as ArrayBuffer);
  return CryptoJS.SHA1(wordArray).toString();
};
