import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {RoundDeleteIcon} from '@/assets/icons/modal';
import {calculateByteLength} from '@/utils/calculateByteLength';

interface TextInputGroupProps {
  inputTitle: string;
  textInput?: string;
  setTextInput: (v: string | undefined) => void;
  placeholder: string;
  errorMessage: string;
  isByteCountVisible: boolean;
}

const TextInputGroup = ({
  inputTitle,
  textInput,
  setTextInput,
  placeholder,
  errorMessage,
  isByteCountVisible,
}: TextInputGroupProps) => {
  const {theme} = useThemeStore();
  const byteLength = calculateByteLength(textInput);

  return (
    <View style={styles.container}>
      <Text
        style={[FONTS.BODY1_SEMIBOLD, {color: theme.MAIN500, marginBottom: 4}]}>
        {inputTitle}
      </Text>
      <View style={styles.inputField}>
        <View style={styles.inputFieldTop}>
          <TextInput
            style={[
              {...styles.input},
              FONTS.BODY1_MEDIUM,
              {color: theme.TEXT800, flex: 1},
            ]}
            placeholder={placeholder}
            placeholderTextColor={theme.TEXT300}
            value={textInput}
            onChangeText={setTextInput}
          />
          <TouchableOpacity onPress={() => setTextInput(undefined)}>
            <RoundDeleteIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.inputFieldBottom}>
          <Text style={[FONTS.BODY2_MEDIUM, {color: theme.ERROR}]}>
            {errorMessage}
          </Text>
          {isByteCountVisible && (
            <Text
              style={[
                FONTS.BODY2_MEDIUM,
                {color: byteLength <= 30 ? theme.TEXT300 : theme.ERROR},
              ]}>
              Byte {byteLength}/30
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputField: {
    width: '100%',
  },
  input: {
    height: 26,
    width: '100%',
  },
  inputFieldTop: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    marginBottom: 8,
  },
  inputFieldBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TextInputGroup;
