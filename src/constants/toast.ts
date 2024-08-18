interface ToastMessageProps {
  CREATE_SUCCESS: string;
  EDIT_SUCCESS: string;
  DELETE_SUCCESS: string;
  DELETE_ACCOUNT: string;
  DELETE_ACCOUNT_CANCEL: string;
}

export const TOAST_MESSAGE: ToastMessageProps = {
  CREATE_SUCCESS: '생성되었습니다',
  EDIT_SUCCESS: '수정되었습니다',
  DELETE_SUCCESS: '휴지통으로 이동되었습니다',
  DELETE_ACCOUNT: '삭제 신청이 접수되었습니다',
  DELETE_ACCOUNT_CANCEL: '삭제 신청이 취소되었습니다',
};
