import {useMemo} from 'react';
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
import {calculateByteLength} from '@/utils/link-utils';
import {type ITheme} from '@/types';

interface TextInputGroupProps {
  inputTitle: string;
  textInput?: string;
  setTextInput: (v: string | undefined) => void;
  placeholder: string;
  errorMessage: string;
  isByteCountVisible?: boolean;
  isUpdateTitle?: boolean;
}

const TextInputGroup = ({
  inputTitle,
  textInput,
  setTextInput,
  placeholder,
  errorMessage,
  isByteCountVisible = false,
  isUpdateTitle = false,
}: TextInputGroupProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const byteLimit = isUpdateTitle ? 300 : 30;
  const byteLength = calculateByteLength(textInput);

  return (
    <View>
      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <View style={styles.inputField}>
        <View style={styles.inputFieldTop}>
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={theme.TEXT300}
            value={textInput}
            onChangeText={setTextInput}
          />
          <TouchableOpacity onPress={() => setTextInput(undefined)}>
            <RoundDeleteIcon fill={theme.TEXT300} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputFieldBottom}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          {isByteCountVisible && (
            <Text
              style={[
                styles.byteCount,
                {color: byteLength <= byteLimit ? theme.TEXT300 : theme.ERROR},
              ]}>
              Byte {byteLength}/{byteLimit}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    inputField: {
      width: '100%',
    },
    inputTitle: {
      marginBottom: 4,
      color: theme.MAIN500,
      ...FONTS.BODY1_SEMIBOLD,
    },
    input: {
      flex: 1,
      height: 59,
      paddingVertical: 16,
      width: '100%',
      color: theme.TEXT800,
      ...FONTS.BODY1_MEDIUM,
    },
    inputFieldTop: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      borderBottomColor: theme.MAIN300,
      borderBottomWidth: 2,
    },
    inputFieldBottom: {
      display: 'flex',
      height: 21,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
    },
    errorMessage: {
      color: theme.ERROR,
      ...FONTS.BODY2_MEDIUM,
    },
    byteCount: {
      ...FONTS.BODY2_MEDIUM,
    },
  });

export default TextInputGroup;
