import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  RefreshControl,
  Platform,
  ActivityIndicator,
  type ListRenderItem,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FONTS} from '@/constants';
import ThemeBackground from '@/components/common/ThemeBackground';
import {useThemeStore} from '@/store/useThemeStore';
import {LargeCardIcon, SmallCardIcon} from '@/assets/icons/home';
import LargeCard from '@/components/home/LargeCard';
import SmallCard from '@/components/home/SmallCard';
import DropdownFilter from '@/components/home/DropDownFilter';
import useStickyAnimation from '@/hooks/useStickyAnimation';
import FolderSideBar from '@/components/modal/FolderSideBar';
import {useBottomButtonSizeStore} from '@/store/useBottomButtonSizeStore';
import {type ILinkDtos, type ITheme} from '@/types';
import useToast from '@/hooks/useToast';
import SmallCardPlaceHolder from '@/components/home/SmallCardPlaceHolder';
import {useLinks} from '@/api/hooks/useLink';
import AnimatedLogoHeader from '@/components/common/AnimatedLogoHeader';

const Home = () => {
  const {t} = useTranslation();
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);

  // 하단 버튼 크기 계산 -> 전역변수 관리
  const {bottom} = useSafeAreaInsets();
  const isHomeIndicatorPresent = Platform.OS === 'ios' && bottom > 0;
  const {setButtonHeight} = useBottomButtonSizeStore();
  const {renderToast, showToast} = useToast({marginBottom: 44});

  // 폴더 사이드바 토글
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);
  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  // 홈 화면 제목 - 선택한 폴더 아이디 (null: 전체)
  const [selectedFolderId, setSelectedFolderId] = useState<number[]>([]);
  const [selectedFolderName, setSelectedFolderName] = useState<string>('전체');

  // util folder로 이동
  const getSortByValue = (selectedOption: string) => {
    switch (selectedOption) {
      case t('최근 저장순'):
        return 'createdAt_desc';
      case t('과거 저장순'):
        return 'createdAt_asc';
      case t('제목순 (A-ㅎ)'):
        return 'title_asc';
      case t('제목순 (ㅎ-A)'):
        return 'title_desc';
      default:
        return 'createdAt_desc';
    }
  };

  const sortingOptions = [
    t('최근 저장순'),
    t('과거 저장순'),
    t('제목순 (A-ㅎ)'),
    t('제목순 (ㅎ-A)'),
  ];

  const [selectedSortingOption, setSelectedSortingOption] = useState(
    sortingOptions[0],
  );
  const handleSelection = (selected: string) => {
    setSelectedSortingOption(selected);
  };

  const linkInfoArgsOptions = {
    folderId: selectedFolderId[0],
    size: 10,
    sortBy: getSortByValue(selectedSortingOption),
  };

  const {
    data: linkData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    linkCount,
  } = useLinks(linkInfoArgsOptions);

  // 카드 사이즈 조절
  const [isLargeCard, setIsLargeCard] = useState(false);
  const toggleCardSize = () => {
    setIsLargeCard(prevState => !prevState);
  };

  // 새로고침 상태 관리
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [refetch]);

  // sticky header 애니메이션
  const {translateY, handleScroll} = useStickyAnimation(refreshing);

  // folder side bar 스와이프 제스쳐
  const animation = useRef(
    new Animated.Value(-Dimensions.get('window').width),
  ).current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => {
          // 좌우로 움직임이 있을 때만 제스처를 활성화
          return Math.abs(gestureState.dx) > 5;
        },
        onMoveShouldSetPanResponderCapture: () => false,
        onPanResponderMove: (evt, gestureState) => {
          const newX = Math.max(
            -Dimensions.get('window').width,
            Math.min(0, gestureState.dx),
          );
          animation.setValue(newX);
        },
        onPanResponderRelease: (evt, gestureState) => {
          const {dx} = gestureState;
          const screenWidth = Dimensions.get('window').width;

          if (dx > screenWidth / 4) {
            // 오른쪽으로 드래그가 일정 거리 이상일 경우 사이드바 열기
            Animated.timing(animation, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              setIsSideBarVisible(true); // 사이드바가 열린 상태로 유지
            });
          } else if (dx < -screenWidth / 4) {
            // 왼쪽으로 드래그가 일정 거리 이상일 경우 사이드바 닫기
            Animated.timing(animation, {
              toValue: -screenWidth,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              setIsSideBarVisible(false); // 사이드바가 닫힌 상태로 설정
            });
          } else {
            // 드래그가 작을 경우 원래 위치로 복귀
            Animated.timing(animation, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }
        },
      }),
    [],
  );

  // FlatList Header 영역
  const ListHeaderComponent = () => {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{selectedFolderName}</Text>
        </View>
        <View style={styles.filterContainer}>
          <Text style={styles.linkCount}>{linkCount} Links</Text>
          <View style={styles.filterContainer}>
            <DropdownFilter
              options={sortingOptions}
              selectedOption={selectedSortingOption}
              onSelect={handleSelection}
            />
            <TouchableOpacity
              style={styles.sizeIconContainer}
              onPress={toggleCardSize}>
              {isLargeCard ? (
                <LargeCardIcon stroke={theme.TEXT700} />
              ) : (
                <SmallCardIcon stroke={theme.TEXT700} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  // FlatList 사용 최적화
  const renderItem: ListRenderItem<ILinkDtos> = useCallback(
    ({item, index}) => {
      const isLastItem =
        index ===
        (linkData?.pages.flatMap(page => page.linkDtos).length ?? 0) - 1;

      if (isLoading) {
        return isLargeCard ? (
          // <LargeCardPlaceHolder />
          <SmallCardPlaceHolder />
        ) : (
          <SmallCardPlaceHolder />
        );
      }

      // 로딩이 완료되면 카드 렌더링
      const CardComponent = isLargeCard ? LargeCard : SmallCard;
      return (
        <View>
          <CardComponent
            content={item}
            showToast={showToast}
            linkInfoArgs={linkInfoArgsOptions}
          />

          {!isLastItem && <View style={styles.separator} />}
        </View>
      );
    },
    [isLoading, isLargeCard, linkData, showToast],
  );

  useEffect(() => {
    const calculatedHeight = isHomeIndicatorPresent ? 80 : 58;
    setButtonHeight(calculatedHeight);
  }, []);

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      <ThemeBackground />
      <View style={styles.mainContainer}>
        <AnimatedLogoHeader
          translateY={translateY}
          toggleSideBar={toggleSideBar}
          backgroundThemeColor={theme.BACKGROUND}
        />
        <FlatList
          data={
            isLoading
              ? Array(10).fill({})
              : linkData?.pages.flatMap(page => page.linkDtos)
          }
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={styles.contentContainer}
          initialNumToRender={10}
          windowSize={10}
          onEndReached={() => {
            if (hasNextPage && !isLoading) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          onScroll={handleScroll}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressViewOffset={60}
            />
          }
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color="#6D96FF" />
            ) : null
          }
        />
      </View>

      {/* 폴더 사이드바 */}
      <FolderSideBar
        {...{
          isSideBarVisible,
          toggleSideBar,
          selectedFolderId,
          setSelectedFolderId,
          setSelectedFolderName,
        }}
      />
      {/* 삭제 토스트 메세지 처리 */}
      {renderToast()}
    </SafeAreaView>
  );
};

export default Home;

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      overflow: 'hidden',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      backgroundColor: theme.BACKGROUND,
    },
    contentContainer: {
      paddingTop: 60,
      paddingHorizontal: 18,
    },
    titleContainer: {
      height: 69,
      justifyContent: 'center',
    },
    title: {
      color: theme.TEXT900,
      ...FONTS.TITLE,
    },
    filterContainer: {
      height: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    linkCount: {
      color: theme.MAIN500,
      ...FONTS.BODY2_MEDIUM,
    },
    sizeIconContainer: {
      marginLeft: 12,
    },
    separator: {
      height: 1,
      marginHorizontal: -18,
      backgroundColor: theme.TEXT200,
    },
  });
