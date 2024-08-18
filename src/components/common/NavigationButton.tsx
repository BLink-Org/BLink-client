import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {ContentBackIcon, ContentFrontIcon} from '@/assets/icons/webview';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';

interface NavigationButtonProps {
  onPress: () => void;
  disabled: boolean;
  label: string;
}

const NavigationButton = ({
  onPress,
  disabled,
  label,
}: NavigationButtonProps) => {
  const {theme} = useThemeStore();
  const textColor = disabled ? theme.TEXT400 : theme.TEXT700;
  const iconColor = disabled ? theme.TEXT400 : theme.TEXT700;
  const IconComponent =
    label === '이전 링크' ? ContentBackIcon : ContentFrontIcon;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={styles.backForwardContainer}>
        {label === '이전 링크' ? (
          <>
            <IconComponent width={14} height={14} fill={iconColor} />
            <Text style={[FONTS.CAPTION_REGULAR, {color: textColor}]}>
              {label}
            </Text>
          </>
        ) : (
          <>
            <Text style={[FONTS.CAPTION_REGULAR, {color: textColor}]}>
              {label}
            </Text>
            <IconComponent width={14} height={14} fill={iconColor} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NavigationButton;

const styles = StyleSheet.create({
  backForwardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
