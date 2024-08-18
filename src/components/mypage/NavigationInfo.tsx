import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ArrowForwardIcon} from '@/assets/icons/mypage';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';

interface NavigationInfoProps {
  title: string;
  themeColor: string;
  onPress: () => void;
}

const NavigationInfo = ({title, themeColor, onPress}: NavigationInfoProps) => {
  const {theme} = useThemeStore();
  const {t} = useTranslation();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={[FONTS.BODY1_MEDIUM, {color: themeColor}]}>
          {t(title)}
        </Text>
        <ArrowForwardIcon fill={theme.TEXT300} />
      </View>
    </TouchableOpacity>
  );
};

export default NavigationInfo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
