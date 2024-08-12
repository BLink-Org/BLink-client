import * as amplitude from '@amplitude/analytics-react-native';

export const trackEvent = (
  eventName: string,
  eventProperties?: Record<string, any>,
) => {
  amplitude.track(eventName, eventProperties);
};
