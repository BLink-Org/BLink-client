import {type ImageSourcePropType} from 'react-native';
import {type SvgProps} from 'react-native-svg';

export interface ITheme {
  BACKGROUND_IMAGE: React.FC<SvgProps>;
  BIG_CARD_IMAGE: ImageSourcePropType;
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
