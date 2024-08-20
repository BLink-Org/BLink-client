import {Platform, Share} from 'react-native';

// TODO: 문구 수정 필요
// export const shareUrl = (currentUrl: string) => {
//   Share.share({
//     if (Platform.OS === 'android') {
//     message: `Check out this website: ${currentUrl}`,
//     }
//     else {
//     url: currentUrl
//     }

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

export const shareUrl = (currentUrl: string) => {
  const shareOptions = Platform.select({
    android: {message: `${currentUrl}`},
    ios: {url: currentUrl},
  });

  if (shareOptions) {
    Share.share(shareOptions).catch(error => {
      console.error('Error sharing:', error.message);
    });
  } else {
    console.error('Error: shareOptions is undefined');
  }
};
