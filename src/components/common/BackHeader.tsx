import {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ArrowBackIcon} from '@/assets/icons/mypage';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {type ITheme} from '@/types';

interface BackHeaderProps {
  title: string;
  themeColor: string;
}

const BackHeader = ({title, themeColor}: BackHeaderProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation();

  // 뒤로가기 버튼 클릭
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerIcon} onPress={handleGoBack}>
        <ArrowBackIcon fill={theme.TEXT900} />
      </TouchableOpacity>
      <View style={styles.headerText}>
        <Text style={[FONTS.TITLE, {color: themeColor}]}>{title}</Text>
      </View>
    </View>
  );
};

export default BackHeader;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
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
