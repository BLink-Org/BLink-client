import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeStore} from '@/store/useThemeStore';
import ThemeBackground from '@/components/common/ThemeBackground';
import BackHeader from '@/components/common/BackHeader';
import {FONTS} from '@/constants';
import ThemeCard from '@/components/mypage/ThemeCard';

const themes = [
  {id: 1, name: '기본', price: 'Free', color: '#4285F4'},
  {
    id: 2,
    name: '다크모드',
    price: 'Free',
    color: '#000000',
  },
  {
    id: 3,
    name: '무드오렌지',
    price: '3,000원',
    color: '#FF5722',
  },
  {
    id: 4,
    name: '사이니스타',
    price: '3,000원',
    color: '#7E57C2',
  },
];

const ThemeSetting = () => {
  const {theme, setTheme, asyncSetTheme, getSavedTheme} = useThemeStore();
  const [selectedThemeId, setSelectedThemeId] = useState<number>(1);

  useEffect(() => {
    const fetchTheme = async () => {
      const savedThemeId = await getSavedTheme();
      if (savedThemeId === null) return;
      setSelectedThemeId(savedThemeId);
    };
    fetchTheme();
  }, [getSavedTheme]);

  const handleSetTheme = (themeId: number) => {
    setSelectedThemeId(themeId);
    setTheme(themeId);
    void asyncSetTheme(themeId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeBackground />
      <BackHeader title="테마 설정" themeColor={theme.TEXT900} />
      <View style={styles.contentContainer}>
        <Text style={[FONTS.BODY2_MEDIUM, {color: theme.MAIN500}]}>
          4 templates
        </Text>
      </View>
      <FlatList
        data={themes}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({item}) => (
          <ThemeCard
            name={item.name}
            price={item.price}
            mainColor={item.color}
            onSelect={() => handleSetTheme(item.id)}
            selected={item.id === selectedThemeId}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
      />
    </SafeAreaView>
  );
};

export default ThemeSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
  },
  contentContainerStyle: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 20,
  },
});
