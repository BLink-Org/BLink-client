import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowBackIcon} from '@/assets/icons/mypage';
import {FONTS} from '@/constants';

interface BackHeaderProps {
  title: string;
  themeColor: string;
}

const BackHeader = ({title, themeColor}: BackHeaderProps) => {
  const navigation = useNavigation();

  // 뒤로가기 버튼 클릭
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerIcon} onPress={handleGoBack}>
        <ArrowBackIcon />
      </TouchableOpacity>
      <View style={styles.headerText}>
        <Text style={[FONTS.TITLE, {color: themeColor}]}>{title}</Text>
      </View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },
  headerIcon: {
    height: 58,
    justifyContent: 'center',
  },
  headerText: {
    height: 69,
    justifyContent: 'center',
  },
});
