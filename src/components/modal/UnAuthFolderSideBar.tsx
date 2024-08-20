import {useEffect, useRef, useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal as RNModal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {BackIcon, ForwardIcon} from '@/assets/icons/modal';
import {type ITheme} from '@/types';
import {ThreeDotIcon} from '@/assets/icons/home';

interface FolderSideBarProps {
  isSideBarVisible: boolean;
  toggleSideBar: () => void;
  selectedFolderId: number[];
  setSelectedFolderId: React.Dispatch<React.SetStateAction<number[]>>;
  setSelectedFolderName: (v: string) => void;
}

const UnAuthFolderSideBar = ({
  isSideBarVisible,
  toggleSideBar,
  selectedFolderId,
  setSelectedFolderId,
  setSelectedFolderName,
}: FolderSideBarProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  const [visible, setVisible] = useState(isSideBarVisible);

  const overlayOpacity = useRef(new Animated.Value(0)).current; // 오버레이의 초기 불투명도
  const sideBarAnimation = useRef(
    new Animated.Value(-Dimensions.get('window').width),
  ).current;

  useEffect(() => {
    if (isSideBarVisible) {
      setVisible(true);
      // 사이드바와 오버레이 동시에 애니메이션
      Animated.parallel([
        Animated.timing(sideBarAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1, // 오버레이를 완전히 불투명하게
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(sideBarAnimation, {
          toValue: -Dimensions.get('window').width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0, // 오버레이를 완전히 투명하게
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setVisible(false);
      });
    }
  }, [isSideBarVisible]);

  return (
    <RNModal
      visible={visible}
      onRequestClose={toggleSideBar}
      transparent
      animationType="none"
      hardwareAccelerated
      presentationStyle="overFullScreen"
      style={styles.modalContent}>
      <TouchableWithoutFeedback onPress={toggleSideBar}>
        <Animated.View style={[styles.overlay, {opacity: overlayOpacity}]} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.modalContent,
          {
            transform: [{translateX: sideBarAnimation}],
            paddingTop: insets.top,
          },
          {
            backgroundColor:
              theme.THEME_NUMBER === 3 ? '#E1EAFF' : theme.BACKGROUND, // TODO: 임시 색상 처리, 이미지로 교체 필요
          },
        ]}>
        <TouchableOpacity onPress={toggleSideBar} style={styles.closeButton}>
          <BackIcon width={26} height={26} fill={theme.TEXT900} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('폴더')}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.linkCount}>{1 + ' Folders'}</Text>
          <TouchableOpacity
            style={styles.totalButton}
            onPress={() => {
              setSelectedFolderId([]);
              toggleSideBar();
            }}>
            <Text style={styles.totalButtonText}>{t('전체보기')}</Text>

            <ForwardIcon fill={theme.TEXT700} />
          </TouchableOpacity>
        </View>

        <View style={styles.folderContainer}>
          <Text style={styles.folderText}>{t('기본 폴더')}</Text>
          <View style={styles.rightSpace}>
            <Text style={styles.folderText}>1</Text>
            <ThreeDotIcon fill={theme.TEXT300} />
          </View>
        </View>
      </Animated.View>
    </RNModal>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
      borderTopRightRadius: 28,
      borderBottomRightRadius: 28,
      width: 316,
      height: '100%',
      padding: 18,
      position: 'absolute',
      left: 0,
      top: 0,
      shadowColor: '#000',
      shadowOffset: {width: 15, height: 0},
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 5,
      backgroundColor: theme.BACKGROUND,
    },
    rightSpace: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    folderContainer: {
      backgroundColor: theme.TEXT100,
      borderColor: theme.TEXT200,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 16,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    folderText: {
      color: theme.TEXT900,
      ...FONTS.BODY1_MEDIUM,
    },
    titleContainer: {
      height: 69,
      justifyContent: 'center',
    },
    title: {
      color: theme.TEXT900,
      ...FONTS.TITLE,
    },
    detailContainer: {
      height: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    linkCount: {
      color: theme.MAIN500,
      ...FONTS.BODY2_MEDIUM,
    },
    totalButton: {
      width: 70,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    totalButtonText: {
      color: theme.TEXT700,
      ...FONTS.BODY2_MEDIUM,
    },
    closeButton: {
      height: 58,
      justifyContent: 'center',
    },
  });

export default UnAuthFolderSideBar;
