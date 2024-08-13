import {type SvgProps} from 'react-native-svg';
import {
  Theme1BackgroundImage,
  Theme1BigCardImage,
  Theme1SmallCardImage,
  Temp2BackgroundImage,
  Theme2BackgroundImage,
  Theme2BigCardImage,
  Theme2SmallCardImage,
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
  BACKGROUND_IMAGE: React.FC<SvgProps>;
  BIG_CARD_IMAGE: React.FC<SvgProps>;
  SMALL_CARD_IMAGE: React.FC<SvgProps>;
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
    BACKGROUND_IMAGE: Theme1BackgroundImage,
    BIG_CARD_IMAGE: Theme1BigCardImage,
    SMALL_CARD_IMAGE: Theme1SmallCardImage,
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
    BACKGROUND_IMAGE: Theme2BackgroundImage,
    BIG_CARD_IMAGE: Theme2BigCardImage,
    SMALL_CARD_IMAGE: Theme2SmallCardImage,
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
    BACKGROUND_IMAGE: Temp2BackgroundImage,
    BIG_CARD_IMAGE: Theme1BigCardImage,
    SMALL_CARD_IMAGE: Theme1SmallCardImage,
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
    BACKGROUND_IMAGE: Theme1BackgroundImage,
    BIG_CARD_IMAGE: Theme1BigCardImage,
    SMALL_CARD_IMAGE: Theme1SmallCardImage,
    BACKGROUND: '#FFFFFF',
    TEXT100: '#123123',
    TEXT200: '#432123',
    TEXT300: '#f12d12',
    TEXT400: '#512d12',
    TEXT500: '#612d12',
    TEXT600: '#712d12',
    TEXT700: '#812d12',
    TEXT800: '#912d12',
    TEXT900: '#a12d12',
    MAIN100: '#293813',
    MAIN200: '#393813',
    MAIN300: '#493813',
    MAIN400: '#593813',
    MAIN500: '#693813',
    SUB: '#FF7970',
    ERROR: '#FF554A',
  },
};
