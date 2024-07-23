import {useState, useCallback} from 'react';
import {type IFileList} from '@/types/home';

const useSearchData = (initialData: IFileList[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<IFileList[]>([]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchQuery(text);
      if (text === '') {
        setFilteredData([]);
      } else {
        const newData = initialData.filter(
          item =>
            item.title.toLowerCase().includes(text.toLowerCase()) ||
            item.description.toLowerCase().includes(text.toLowerCase()) ||
            item.hostname?.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredData(newData);
      }
    },
    [initialData],
  );

  return {searchQuery, handleSearch, filteredData};
};

export default useSearchData;
