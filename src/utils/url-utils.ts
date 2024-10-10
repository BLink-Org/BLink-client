import {Platform, Share} from 'react-native';

// hostname 추출 util function
export function extractHostname(url: string): string {
  try {
    const matches = url.match(
      /^(?:https?:\/\/)?(?:www\.)?([^/:?#]+)(?:[/:?#]|$)/i,
    );
    return matches?.[1] ?? '';
  } catch (error) {
    console.warn('Error extracting hostname:', error);
    return '';
  }
}

export function isValidUrl(url: string): boolean {
  const regex =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{1,63}\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
  return regex.test(url);
}

export const shareUrl = (currentUrl: string) => {
  const shareOptions = Platform.select({
    android: {message: `${currentUrl}`},
    ios: {url: currentUrl},
  });

  if (shareOptions) {
    Share.share(shareOptions).catch(error => {
      console.warn('Error sharing:', error.message);
    });
  } else {
    console.warn('Error: shareOptions is undefined');
  }
};
