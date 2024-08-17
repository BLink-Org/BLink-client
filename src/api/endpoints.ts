export const API_ENDPOINTS = {
  TEST: {
    HEALTH: '/health', // Health Check
  },
  AUTH: {
    LOGIN_GOOGLE: '/api/auth/login/google', // 구글 로그인
    LOGIN_APPLE: '/api/auth/login/apple', // 애플 로그인
    LOGOUT: '/api/auth/logout', // 로그아웃
    REISSUE: '/api/auth/reissue', // 토큰 재발급
  },
  USER: {
    INFO: '/api/users',
    DELETE_ACCOUNT: '/api/users/delete', // 계정 삭제 신청
    CANCEL_DELETE_ACCOUNT: '/api/users/cancel', // 계정 삭제 철회
  },
  FOLDER: {
    FETCH: '/api/folders', // 폴더 목록 조회
    CREATE: '/api/folders', // 폴더 생성
    DELETE: '/api/folders/:folderId', // 폴더 삭제
    UPDATE_TITLE: '/api/folders/:folderId', // 폴더 제목 수정
    MOVE: '/api/folders/:folderId/move?direction=:direction', // 폴더 순서 이동
  },
  LINKS: {
    FETCH: '/api/links', // 링크 목록 조회
    FETCH_FOLDER: '/api/links/:linkId/folder', // 링크가 저장된 폴더 목록 조회
    CREATE: '/api/links', // 링크 저장
    MOVE: '/api/links/:linkId/move', // 링크 저장 폴더 변경
    DELETE: '/api/links/:linkId', // 휴지통에서 링크 영구삭제
    UPDATE_TITLE: '/api/links/:linkId', // 링크 제목 수정
    VIEW: '/api/links/:linkId/view', // 링크 조회
    TRASH_RECOVER: '/api/links/:linkId/trash/recover', // 휴지통에서 링크 복구
    TRASH_MOVE: '/api/links/:linkId/trash/move', // 링크 휴지통 이동
    PIN_TOGGLE: '/api/links/:linkId/pin/toggle', // 링크 고정 토글
    GET_TRASH: '/api/links/trash', // 휴지통 링크 목록 조회
    GET_PINNED: '/api/links/pinned', // 핀 고정 링크 목록 조회
    SEARCH: '/api/links/search', // 링크 검색
    RECENT_SEARCH: '/api/links/recent', // 최근 검색어 조회
  },
};
