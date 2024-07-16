import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {type IFileList} from '@/types/home';

const useSortedData = (
  data: IFileList[],
  selectedSortingOption: string,
): IFileList[] => {
  const {t} = useTranslation();
  const [sortedData, setSortedData] = useState<IFileList[]>(data);

  useEffect(() => {
    const sortData = () => {
      const sortedArray = [...data];

      if (selectedSortingOption === t('최근 저장순')) {
        sortedArray.sort((a, b) => b.saveDay.localeCompare(a.saveDay));
      } else if (selectedSortingOption === t('과거 저장순')) {
        sortedArray.sort((a, b) => a.saveDay.localeCompare(b.saveDay));
      } else if (selectedSortingOption === t('제목순 (A-ㅎ)')) {
        sortedArray.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
      } else if (selectedSortingOption === t('제목순 (ㅎ-A)')) {
        sortedArray.sort((a, b) => b.title.localeCompare(a.title, 'ko'));
      }

      setSortedData(sortedArray);
    };

    sortData();
  }, [selectedSortingOption, data]);

  return sortedData;
};

export default useSortedData;
