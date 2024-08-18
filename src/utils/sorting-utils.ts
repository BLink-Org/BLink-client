import {type IFunction} from '@/types';

export const getSortByValue = (t: IFunction, selectedOption: string) => {
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

export const getSortingOptions = (t: IFunction) => [
  t('최근 저장순'),
  t('과거 저장순'),
  t('제목순 (A-ㅎ)'),
  t('제목순 (ㅎ-A)'),
];

export const getSortByTrashValue = (t: IFunction, selectedOption: string) => {
  switch (selectedOption) {
    case t('최근 삭제순'):
      return 'trashMovedDate_desc';
    case t('과거 삭제순'):
      return 'trashMovedDate_asc';
    default:
      return 'trashMovedDate_desc';
  }
};

export const getSortingTrashOptions = (t: IFunction) => [
  t('최근 삭제순'),
  t('과거 삭제순'),
];
