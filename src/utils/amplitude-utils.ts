import * as amplitude from '@amplitude/analytics-react-native';
import {AMPLITUDE_API_KEY} from '@env';

export const initializeAmplitude = (userId?: string) => {
  if (!userId) {
    amplitude.init(AMPLITUDE_API_KEY); // Initialize without userId -> login 안되어있을 때
  } else {
    amplitude.init(AMPLITUDE_API_KEY, userId); // Initialize with userId -> login 되어있을 때
  }
};

export const trackEvent = (
  eventName: string,
  eventProperties?: Record<string, any>,
) => {
  amplitude.track(eventName, eventProperties);
};
