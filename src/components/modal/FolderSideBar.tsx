import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal as RNModal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {BackIcon, ForwardIcon} from '@/assets/icons/folder';
import FolderButton, {type FolderButtonProps} from '../folder/FolderButton';

interface FolderSideBarProps {
  isSideBarVisible: boolean;
  toggleSideBar: () => void;
}

const FolderSideBar = ({
  isSideBarVisible,
  toggleSideBar,
}: FolderSideBarProps) => {
  const {theme} = useThemeStore();
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = useState(isSideBarVisible);
  const animation = useRef(
    new Animated.Value(-Dimensions.get('window').width),
  ).current;

  useEffect(() => {
    if (isSideBarVisible) {
      setVisible(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: -Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }
  }, [isSideBarVisible]);

  // TODO: delete mock data
  interface FolderButtonData extends FolderButtonProps {
    id: string;
  }
  const mockData: FolderButtonData[] = [
    {id: '1', variants: 'pressed', name: '아티클', number: 17},
    {id: '2', variants: 'activated', name: 'Netflix', number: 17},
    {id: '3', variants: 'default', name: '기술 정보', number: 17},
    {id: '4', variants: 'default', name: 'CMC', number: 17},
    {id: '5', variants: 'default', name: '과학이야기', number: 17},
  ];

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
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.modalContent,
          {
            transform: [{translateX: animation}],
            paddingTop: insets.top,
          },
        ]}>
        <TouchableOpacity onPress={toggleSideBar} style={styles.closeButton}>
          <BackIcon width={26} height={26} fill={theme.TEXT900} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[FONTS.TITLE, {color: theme.TEXT900}]}>폴더</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={[FONTS.BODY2_MEDIUM, {color: theme.MAIN500}]}>
            123 Links
          </Text>
          <TouchableOpacity style={styles.totalButton}>
            <Text style={[FONTS.BODY2_MEDIUM, {color: theme.TEXT700}]}>
              전체보기
            </Text>
            <ForwardIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.folderList}>
          <FlatList
            data={mockData}
            renderItem={({item}) => (
              <FolderButton
                variants={item.variants}
                name={item.name}
                number={item.number}
              />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Animated.View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: 'white',
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
  },
  titleContainer: {
    height: 69,
    justifyContent: 'center',
  },
  detailContainer: {
    height: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalButton: {
    width: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  folderList: {
    height: 516,
    paddingVertical: 20,
  },
  separator: {
    height: 8,
  },
  closeButton: {
    height: 58,
    justifyContent: 'center',
  },
});

export default FolderSideBar;
