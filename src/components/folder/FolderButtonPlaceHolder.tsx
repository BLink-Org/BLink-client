import {StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useThemeStore} from '@/store/useThemeStore';

const FolderButtonPlaceHolder = ({
  isMultipleSelection,
}: {
  isMultipleSelection: boolean;
}) => {
  const {theme} = useThemeStore();

  return (
    <SkeletonPlaceholder
      borderRadius={4}
      backgroundColor={theme.TEXT200}
      highlightColor={theme.TEXT100}>
      <>
        <View style={styles.container}></View>
        {isMultipleSelection && <View style={styles.stroke}></View>}
        <View style={styles.container}></View>
        <View style={styles.container}></View>
        <View style={styles.container}></View>
        <View style={styles.container}></View>
        {!isMultipleSelection && (
          <View style={[styles.stroke, {borderColor: theme.TEXT200}]}></View>
        )}
        <View style={styles.container}></View>
      </>
    </SkeletonPlaceholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 58,
    borderRadius: 8,
    marginBottom: 8,
  },
  stroke: {
    borderWidth: 1,
    width: '100%',
    marginBottom: 8,
  },
});

export default FolderButtonPlaceHolder;
