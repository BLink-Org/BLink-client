export const calculateByteLength = (str: string = '') => {
  let byteLength = 0;
  for (let i = 0; i < str.length; i++) {
    const codePoint = str.codePointAt(i);
    if (codePoint !== undefined) {
      byteLength += codePoint > 0xffff ? 4 : 2;
      if (codePoint > 0xffff) {
        i++;
      }
    }
  }
  return byteLength;
};
