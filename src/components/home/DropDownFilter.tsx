import {useState, useRef, useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {ArrowDownIcon} from '@/assets/icons/home';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {type ITheme} from '@/types';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const DropdownFilter = ({options, selectedOption, onSelect}: DropdownProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<TouchableOpacity>(null);
  const [buttonY, setButtonY] = useState(0);
  const [buttonX, setButtonX] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(0);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setButtonY(pageY);
      setButtonX(pageX);
      setButtonWidth(width);
      setIsOpen(!isOpen);
    });
  };

  return (
    <View>
      <TouchableOpacity
        ref={buttonRef}
        onPress={toggleDropdown}
        style={styles.button}>
        <Text style={styles.selectedOptionText}>{selectedOption}</Text>
        <ArrowDownIcon fill={theme.TEXT700} />
      </TouchableOpacity>
      <Modal
        isVisible={isOpen}
        onBackdropPress={() => setIsOpen(false)}
        backdropColor="transparent"
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={[
          styles.modalContainer,
          {
            marginTop: buttonY + 24,
            marginLeft: buttonX + buttonWidth - 160,
          },
        ]}>
        <View style={styles.dropdown}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(option)}
              style={[
                styles.item,
                {borderBottomColor: theme.TEXT200},
                {borderBottomWidth: index === options.length - 1 ? 0 : 1},
              ]}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectedOptionText: {
      ...FONTS.BODY2_MEDIUM,
      color: theme.TEXT700,
    },
    modalContainer: {
      justifyContent: 'flex-start',
      margin: 0,
      width: 160,
    },
    dropdown: {
      backgroundColor: 'white',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    item: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
    },
    optionText: {
      ...FONTS.BODY2_MEDIUM,
      color: theme.TEXT700,
    },
  });

export default DropdownFilter;
