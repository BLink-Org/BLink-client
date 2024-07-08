import {type SvgProps} from 'react-native-svg';
import Theme1 from '@/assets/background/theme1.svg';
import Theme2 from '@/assets/background/theme2.svg';

interface Theme {
  MAIN_COLOR: string;
  SUB_COLOR: string;
  TEXT_COLOR: string;
  BACKGROUND_IMAGE: React.FC<SvgProps>;
}

const themes: Record<number, Theme> = {
  1: {
    MAIN_COLOR: '#3498db',
    SUB_COLOR: '#2980b9',
    TEXT_COLOR: '#ffffff',
    BACKGROUND_IMAGE: Theme1,
    // 링크컨테이너 이미지 ...
    // 하단바 아이콘 이미지 ..
  },
  2: {
    MAIN_COLOR: '#e74c3c',
    SUB_COLOR: '#c0392b',
    TEXT_COLOR: '#faf',
    BACKGROUND_IMAGE: Theme2,
    // 링크컨테이너 이미지 ...
    // 하단바 아이콘 이미지 ..
  },
  3: {
    MAIN_COLOR: '#2ecc71',
    SUB_COLOR: '#27ae60',
    TEXT_COLOR: '#f1f',
    BACKGROUND_IMAGE: Theme1,
    // 링크컨테이너 이미지 ...
    // 하단바 아이콘 이미지 ..
  },
  4: {
    MAIN_COLOR: '#f1c40f',
    SUB_COLOR: '#f39c12',
    TEXT_COLOR: '#000000',
    BACKGROUND_IMAGE: Theme2, 
    // 링크컨테이너 이미지 ...
    // 하단바 아이콘 이미지 ..
  },
};

export {themes, type Theme};
