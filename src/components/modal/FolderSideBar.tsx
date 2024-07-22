import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {BackIcon, ForwardIcon} from '@/assets/icons/folder';

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

  return (
    <Modal
      isVisible={isSideBarVisible}
      onBackdropPress={toggleSideBar}
      onSwipeComplete={toggleSideBar}
      swipeDirection="left"
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      backdropColor="transparent"
      backdropOpacity={0}
      style={styles.modal}>
      <SafeAreaView style={[styles.modalContent, {paddingTop: insets.top}]}>
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
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
    flex: 1,
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
  closeButton: {
    height: 58,
    justifyContent: 'center',
  },
});

export default FolderSideBar;
