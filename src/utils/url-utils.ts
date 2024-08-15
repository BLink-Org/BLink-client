import {Share} from 'react-native';

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

// TODO: 문구 수정 필요
export const shareUrl = (currentUrl: string) => {
  Share.share({
    message: `Check out this website: ${currentUrl}`,
    url: currentUrl,
  }).catch(error => {
    console.error('Error sharing: ', error.message);
  });
};

export const shareUrlHome = async (currentUrl: string) => {
  return await Share.share({
    message: `Check out this website: ${currentUrl}`,
    url: currentUrl,
  })
    .then(result => {
      if (
        result.action === Share.sharedAction ||
        result.action === Share.dismissedAction
      ) {
        console.log('Share action finished:', result.action);
        return result;
      }
    })
    .catch(error => {
      console.error('Error sharing:', error.message);
      throw error; // 에러를 다시 던져서 onSelect에서 처리할 수 있도록 함
    });
};
