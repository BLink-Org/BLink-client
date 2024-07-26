import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';

interface ThemeCardProps {
  name: string;
  price: string;
  mainColor: string;
  onSelect: () => void;
  selected: boolean;
}

const ThemeCard = ({
  name,
  price,
  mainColor,
  onSelect,
  selected,
}: ThemeCardProps) => {
  const {theme} = useThemeStore();

  return (
    <TouchableOpacity onPress={onSelect} style={styles.mainContainer}>
      <View
        style={[
          styles.card,
          {borderColor: theme.TEXT200},
          selected && {borderColor: mainColor},
        ]}>
        <View style={[styles.headerBackground, {backgroundColor: mainColor}]} />
        <View style={styles.bodyContainer}>
          <View style={styles.textBox}>
            <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT800}]}>
              {name}
            </Text>
            <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
              {price}
            </Text>
          </View>
          {selected ? (
            <View style={styles.buttonContainer}>
              <View
                style={[styles.doubleCircle, {backgroundColor: theme.MAIN400}]}
              />
              <View
                style={[styles.innerCircle, {backgroundColor: theme.MAIN500}]}
              />
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <View
                style={[styles.unSelectedCircle, {borderColor: theme.TEXT300}]}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ThemeCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  card: {
    marginHorizontal: 6,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  headerBackground: {
    height: 140,
    width: '100%',
  },

  bodyContainer: {
    padding: 12,
    gap: 8,
  },
  textBox: {
    gap: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  doubleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  innerCircle: {
    position: 'absolute',
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  unSelectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
});
