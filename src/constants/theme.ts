import {type SvgProps} from 'react-native-svg';
import {type ImageSourcePropType} from 'react-native';
import {
  Theme1BackgroundImage,
  Theme1BigCardImage,
  Theme1SmallCardImage,
  Temp2BackgroundImage,
  Theme2BackgroundImage,
  Theme2BigCardImage,
  Theme2SmallCardImage,
  Theme3BackgroundImage,
  Theme3BigCardImage,
  Theme3SmallCardImage,
} from '@/assets/icons/theme';

export const THEME_INFOS = [
  {id: 1, name: '기본', price: 'Free', color: '#4285F4'},
  {
    id: 2,
    name: '다크모드',
    price: 'Free',
    color: '#000000',
  },
  {
    id: 3,
    name: '무드오렌지',
    price: '3,000원',
    color: '#FF7970',
  },
  {
    id: 4,
    name: '사이니스타',
    price: '3,000원',
    color: '#EdE4FC',
  },
];

// TODO: 추후 type폴더로 이동
export interface Theme {
  THEME_NUMBER: number;
  BACKGROUND_IMAGE: React.FC<SvgProps>;
  BIG_CARD_IMAGE: React.FC<SvgProps>;
  SMALL_CARD_IMAGE: React.FC<SvgProps>;
  EMPTY_IMAGE: ImageSourcePropType;
  SEARCH_EDGE_IMAGE: ImageSourcePropType;
  ERROR_IMAGE: ImageSourcePropType;
  BACKGROUND: string;
  TEXT100: string;
  TEXT200: string;
  TEXT300: string;
  TEXT400: string;
  TEXT500: string;
  TEXT600: string;
  TEXT700: string;
  TEXT800: string;
  TEXT900: string;
  MAIN100: string;
  MAIN200: string;
  MAIN300: string;
  MAIN400: string;
  MAIN500: string;
  SUB: string;
  ERROR: string;
}

export const THEMES: Record<number, Theme> = {
  1: {
    THEME_NUMBER: 1,
    BACKGROUND_IMAGE: Theme1BackgroundImage,
    BIG_CARD_IMAGE: Theme1BigCardImage,
    SMALL_CARD_IMAGE: Theme1SmallCardImage,
    EMPTY_IMAGE: require('@/assets/images/img-empty.png'),
    SEARCH_EDGE_IMAGE: require('@/assets/images/img-searchedge.png'),
    ERROR_IMAGE: require('@/assets/images/img-error.png'),
    BACKGROUND: '#FFFFFF',
    TEXT100: '#F7F9FB',
    TEXT200: '#ECF1F5',
    TEXT300: '#C1C9D3',
    TEXT400: '#A8B0BA',
    TEXT500: '#6B7684',
    TEXT600: '#4E6968',
    TEXT700: '#333D4B',
    TEXT800: '#161B21',
    TEXT900: '#000000',
    MAIN100: '#EEF3FF',
    MAIN200: '#D8E3FF',
    MAIN300: '#8AABFF',
    MAIN400: '#6D96FF',
    MAIN500: '#4A7DFF',
    SUB: '#FF7970',
    ERROR: '#FF554A',
  },
  2: {
    THEME_NUMBER: 2,
    BACKGROUND_IMAGE: Theme2BackgroundImage,
    BIG_CARD_IMAGE: Theme2BigCardImage,
    SMALL_CARD_IMAGE: Theme2SmallCardImage,
    EMPTY_IMAGE: require('@/assets/images/img-empty-dark.png'),
    SEARCH_EDGE_IMAGE: require('@/assets/images/img-searchedge-dark.png'),
    ERROR_IMAGE: require('@/assets/images/img-error-dark.png'),
    BACKGROUND: '#1F1F26',
    TEXT100: '#292934',
    TEXT200: '#3A4049',
    TEXT300: '#4E5968',
    TEXT400: '#6B7684',
    TEXT500: '#848D98',
    TEXT600: '#C0C9D4',
    TEXT700: '#CBD5E0',
    TEXT800: '#F7F9FB',
    TEXT900: '#FFFFFF',
    MAIN100: '#282E41',
    MAIN200: '#2F3751',
    MAIN300: '#4B64A9',
    MAIN400: '#6D96FF',
    MAIN500: '#8FB8FF',
    SUB: '#FF7970',
    ERROR: '#FF554A',
  },
  3: {
    THEME_NUMBER: 3,
    BACKGROUND_IMAGE: Theme3BackgroundImage,
    BIG_CARD_IMAGE: Theme3BigCardImage,
    SMALL_CARD_IMAGE: Theme3SmallCardImage,
    EMPTY_IMAGE: require('@/assets/images/img-empty.png'),
    SEARCH_EDGE_IMAGE: require('@/assets/images/img-searchedge.png'),
    ERROR_IMAGE: require('@/assets/images/img-error.png'),
    BACKGROUND: '#FFFFFF',
    TEXT100: '#F7F9FB',
    TEXT200: '#ECF1F5',
    TEXT300: '#C1C9D3',
    TEXT400: '#A8B0BA',
    TEXT500: '#6B7684',
    TEXT600: '#4E6968',
    TEXT700: '#333D4B',
    TEXT800: '#161B21',
    TEXT900: '#000000',
    MAIN100: '#EEF3FF',
    MAIN200: '#D8E3FF',
    MAIN300: '#8AABFF',
    MAIN400: '#6D96FF',
    MAIN500: '#4A7DFF',
    SUB: '#FF7970',
    ERROR: '#FF554A',
  },
  4: {
    THEME_NUMBER: 4,
    BACKGROUND_IMAGE: Theme3BackgroundImage,
    BIG_CARD_IMAGE: Theme3BigCardImage,
    SMALL_CARD_IMAGE: Theme3SmallCardImage,
    EMPTY_IMAGE: require('@/assets/images/img-empty.png'),
    SEARCH_EDGE_IMAGE: require('@/assets/images/img-searchedge.png'),
    ERROR_IMAGE: require('@/assets/images/img-error.png'),
    BACKGROUND: '#FFFFFF',
    TEXT100: '#F7F9FB',
    TEXT200: '#ECF1F5',
    TEXT300: '#C1C9D3',
    TEXT400: '#A8B0BA',
    TEXT500: '#6B7684',
    TEXT600: '#4E6968',
    TEXT700: '#333D4B',
    TEXT800: '#161B21',
    TEXT900: '#000000',
    MAIN100: '#EEF3FF',
    MAIN200: '#D8E3FF',
    MAIN300: '#8AABFF',
    MAIN400: '#6D96FF',
    MAIN500: '#4A7DFF',
    SUB: '#FF7970',
    ERROR: '#FF554A',
  },
};
