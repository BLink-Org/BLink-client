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
