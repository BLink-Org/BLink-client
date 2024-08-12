import React, {useState} from 'react';
import {FlatList, View, StyleSheet, Text, Image} from 'react-native';
import {FONTS} from '@/constants';

interface IPage {
  key: string;
  image: JSX.Element;
}

interface ICarousel {
  gap: number;
  offset: number;
  pages: IPage[];
  pageWidth: number;
}

const Carousel = ({pages, pageWidth, gap, offset}: ICarousel) => {
  const [page, setPage] = useState(0);

  function renderItem({item}: {item: IPage}) {
    return (
      <View
        style={[styles.page, {width: pageWidth, marginHorizontal: gap / 2}]}>
        {item.image}
      </View>
    );
  }

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/blue-logo.png')}
        style={styles.logoImage}
      />
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={item => `page__${item.key}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        getItemLayout={(_, index) => ({
          length: pageWidth + gap,
          offset: (pageWidth + gap) * index,
          index,
        })}
      />
      <View style={styles.page}>
        <Text style={styles.bodyText}>링크를 저장하고 관리해보세요!</Text>
        <View style={styles.indicatorWrapper}>
          {Array.from({length: pages.length}, (_, i) => i).map(i => (
            <View
              key={`indicator_${i}`}
              style={[
                styles.indicator,
                {backgroundColor: i === page ? '#FFF' : '#8AABFF'},
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    height: 383,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  logoImage: {
    width: 144,
    height: 48,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  indicatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  indicator: {
    margin: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bodyText: {
    color: '#FFF',
    ...FONTS.BODY1_SEMIBOLD,
  },
});
