import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {ContentBackIcon, ContentFrontIcon} from '@/assets/icons/webview';
import {FONTS} from '@/constants';

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
  const textColor = disabled ? 'lightgray' : 'black';
  const iconColor = disabled ? 'lightgray' : 'black';
  const IconComponent = label === '이전' ? ContentBackIcon : ContentFrontIcon;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={styles.backForwardContainer}>
        {label === '이전' ? (
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
