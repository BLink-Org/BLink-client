// hostname 추출 util function
export function extractHostname(url: string): string {
  try {
    const matches = url.match(
      /^(?:https?:\/\/)?(?:www\.)?([^/:?#]+)(?:[/:?#]|$)/i,
    );
    return matches?.[1] ?? '';
  } catch (error) {
    console.error('Error extracting hostname:', error);
    return '';
  }
}

export function isValidUrl(url: string): boolean {
  const regex =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{1,63}\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
  return regex.test(url);
}
