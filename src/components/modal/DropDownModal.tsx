import {
  cloneElement,
  type ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {type ITheme} from '@/types';

interface Option {
  label: string;
  icon: ReactElement;
  onSelect: () => void;
}

interface DropDownModalProps {
  isVisible: boolean;
  options: Option[];
  onClose: () => void;
  anchorPosition: {x: number; y: number};
}

const DropDownModal = ({
  isVisible,
  options,
  onClose,
  anchorPosition,
}: DropDownModalProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [isModalVisible, setIsVisible] = useState(isVisible);
  useEffect(() => {
    setIsVisible(isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    // 0.3초 timeout 끝난 후 onClose 실행
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      backdropColor="transparent"
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300}
      animationOutTiming={300}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      style={[
        styles.modal,
        {marginTop: anchorPosition.y + 4, marginLeft: anchorPosition.x - 140},
      ]}>
      <View style={styles.modalContent}>
        <View style={styles.dropdown}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                {
                  borderBottomWidth: index === options.length - 1 ? 0 : 1,
                  borderBottomColor: theme.TEXT200,
                },
              ]}
              onPress={option.onSelect}>
              {cloneElement(option.icon, {
                fill:
                  index === options.length - 1 ? theme.ERROR : theme.TEXT600,
              })}
              <Text
                style={[
                  FONTS.BODY2_REGULAR,
                  {
                    color:
                      index === options.length - 1
                        ? theme.ERROR
                        : theme.TEXT800,
                  },
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default DropDownModal;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    modal: {
      margin: 0,
      flex: 1,
      justifyContent: 'flex-start',
    },
    modalContent: {
      backgroundColor: theme.BACKGROUND,
      borderRadius: 12,
      width: 160,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        android: {
          borderWidth: 2,
          borderColor: theme.TEXT100,
        },
      }),
    },
    dropdown: {
      backgroundColor: theme.BACKGROUND,
      borderRadius: 5,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      gap: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.TEXT200,
    },
  });
