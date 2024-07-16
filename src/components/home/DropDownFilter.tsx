import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {ArrowDownIcon} from '@/assets/icons/home';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const DropdownFilter = ({options, selectedOption, onSelect}: DropdownProps) => {
  const {theme} = useThemeStore();
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
        <Text style={[FONTS.BODY2_MEDIUM, {color: theme.TEXT700}]}>
          {selectedOption}
        </Text>
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
                {borderBottomWidth: index === options.length - 1 ? 0 : 1},
              ]}>
              <Text style={[FONTS.BODY2_MEDIUM, {color: theme.TEXT700}]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
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
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DropdownFilter;
