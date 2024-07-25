import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {type IFileList} from '@/types/home';
import {DeleteIcon} from '@/assets/icons/search';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';

interface LargeCardProps {
  content: IFileList;
}



const DeleteCard = ({content}: LargeCardProps) => {
  const {theme} = useThemeStore();
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={[FONTS.BODY2_REGULAR, {color: theme.TEXT600}]}>
          {content.folder}
        </Text>
        <Text
          style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT900}]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {content.title}
        </Text>
      </View>
      <TouchableOpacity style={styles.rightContainer}>
        <DeleteIcon />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  leftContainer: {
    flexDirection: 'column',
    gap: 8,
    flex: 1,
  },
  rightContainer: {},
});
