import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {EditIcon} from '@/assets/icons/folder';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';

// TODO: delete export keyword (mockData)
export interface FolderButtonProps {
  variants: 'pressed' | 'activated' | 'default';
  name?: string;
  number?: number;
}

const FolderButton = ({variants, name, number}: FolderButtonProps) => {
  const {theme} = useThemeStore();

  const variantStyles = (() => {
    switch (variants) {
      case 'pressed':
        return {
          borderWidth: 1,
          backgroundColor: theme.MAIN200,
          borderColor: theme.MAIN400,
        };
      case 'activated':
        return {
          borderWidth: 1,
          backgroundColor: theme.TEXT200,
          borderColor: theme.TEXT200,
        };
      default:
        return {
          borderWidth: 1,
          backgroundColor: theme.TEXT100,
          borderColor: theme.TEXT200,
        };
    }
  })();

  return (
    <TouchableOpacity style={[styles.container, variantStyles]}>
      <View style={styles.infocontainer}>
        <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT900}]}>{name}</Text>
        {number && (
          <View style={styles.detailContainer}>
            <Text style={[FONTS.BODY2_MEDIUM, {color: theme.TEXT700}]}>
              {number}
            </Text>
            <TouchableHighlight>
              <EditIcon />
            </TouchableHighlight>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 58,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  infocontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailContainer: {
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FolderButton;
