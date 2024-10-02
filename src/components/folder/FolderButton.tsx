import {useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {DownIcon, EditIcon, UpIcon} from '@/assets/icons/modal';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {DeleteIcon, PencilIcon} from '@/assets/icons/mypage';
import {type ITheme} from '@/types';
import DropDownModal from '@/components/modal/DropDownModal';
import {useModalStore} from '@/store/useModalStore';
import AlertModal from '@/components/modal/AlertModal';
import {TOAST_MESSAGE} from '@/constants/toast';
import {useDeleteFolder} from '@/api/hooks/useFolder';
import {trackEvent} from '@/utils/amplitude-utils';

interface FolderButtonProps {
  id: number;
  variants: 'pressed' | 'activated' | 'default';
  name?: string;
  number?: number;
  recent?: boolean;
  onPress: () => void;
  showToast?: (label: string) => void;
  handleSelect?: (label: string) => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

const FolderButton = ({
  id,
  variants,
  name,
  number,
  recent = false,
  onPress,
  showToast = () => {},
  handleSelect = () => {},
  onMoveUp,
  onMoveDown,
}: FolderButtonProps) => {
  const {theme} = useThemeStore();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useTranslation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeDropdown = () => setIsDropdownOpen(false);

  const [anchorPosition, setAnchorPosition] = useState({x: 0, y: 0});
  const buttonRef = useRef<TouchableOpacity>(null);

  const {showModal, closeModal} = useModalStore();
  const modalId = `folderDelete-${id}`;

  // 폴더 삭제
  const queryClient = useQueryClient();
  const {mutate: deleteFolder} = useDeleteFolder({
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['folders']});
      showToast(t(TOAST_MESSAGE.DELETE_SUCCESS));
      trackEvent('Folder_Deleted', {
        Folder_ID: id,
      });
    },
  });

  const toggleDropdown = () => {
    buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setIsDropdownOpen(true);
      setAnchorPosition({x: pageX, y: pageY + height});
    });
  };

  const handleConfirmSelect = () => {
    closeModal(modalId);
    deleteFolder(id);
  };

  const folderOptions = useMemo(
    () => [
      {
        label: t('폴더명 수정'),
        icon: <PencilIcon />,
        onSelect: () => {
          closeDropdown();
          handleSelect('폴더명 수정');
        },
      },
      {
        label: t('위로 이동'),
        icon: <UpIcon />,
        onSelect: () => {
          closeDropdown();
          onMoveUp && onMoveUp();
        },
      },
      {
        label: t('아래로 이동'),
        icon: <DownIcon />,
        onSelect: () => {
          closeDropdown();
          onMoveDown && onMoveDown();
        },
      },
      {
        label: t('삭제'),
        icon: <DeleteIcon />,
        onSelect: () => {
          showModal(modalId);
          closeDropdown();
        },
      },
    ],
    [closeDropdown, handleSelect],
  );

  const variantStyles = (() => {
    switch (variants) {
      case 'pressed':
        return {
          borderWidth: 1,
          backgroundColor: theme.MAIN200,
          borderColor: theme.MAIN400,
        };
      case 'activated':
        return {
          borderWidth: 1,
          backgroundColor: theme.TEXT200,
          borderColor: theme.TEXT200,
        };
      default:
        return {
          borderWidth: 1,
          backgroundColor: name ? theme.TEXT100 : theme.BACKGROUND,
          borderColor: theme.TEXT200,
        };
    }
  })();

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          variantStyles,
          {borderStyle: name ? 'solid' : 'dashed'},
        ]}
        onPress={onPress}>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
            {name ?? t('폴더 없는 링크')}
          </Text>
          {number !== undefined ? (
            <View style={styles.detailContainer}>
              <Text style={styles.numberText}>{number}</Text>
              <TouchableOpacity
                style={styles.editIcon}
                ref={buttonRef}
                onPress={name ? toggleDropdown : () => {}}>
                <EditIcon fill={name ? theme.TEXT300 : 'transparent'} />
              </TouchableOpacity>
              {isDropdownOpen && (
                <DropDownModal
                  isVisible={isDropdownOpen}
                  options={folderOptions}
                  onClose={closeDropdown}
                  anchorPosition={anchorPosition}
                />
              )}
            </View>
          ) : (
            recent && (
              <View style={styles.recentContainer}>
                <Text style={styles.recentText}>{t('최근 저장')}</Text>
              </View>
            )
          )}
        </View>
      </TouchableOpacity>

      {/* alertModal 처리 */}
      <AlertModal
        modalId={modalId}
        headerText={t('폴더 속 링크도 삭제됩니다')}
        bodyText={t(
          '링크가 다른 폴더에도 저장되어 있었다면 그 폴더에서는 삭제되지 않아요.',
        )}
        leftText={t('취소')}
        rightText={t('삭제')}
        rightOnPress={handleConfirmSelect}
      />
    </>
  );
};

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: 58,
      borderRadius: 8,
      justifyContent: 'center',
      paddingVertical: 16,
      paddingLeft: 20,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nameText: {
      flex: 1,
      color: theme.TEXT900,
      ...FONTS.BODY1_MEDIUM,
    },
    editIcon: {
      paddingLeft: 16,
      paddingRight: 20,
      paddingVertical: 16,
    },
    numberText: {
      color: theme.TEXT700,
      ...FONTS.BODY2_MEDIUM,
    },
    recentContainer: {
      height: '100%',
      marginRight: 20,
      paddingVertical: 2,
      paddingHorizontal: 8,
      borderRadius: 4,
      backgroundColor: theme.MAIN200,
    },
    recentText: {
      color: theme.MAIN500,
      ...FONTS.BODY3_MEDIUM,
    },
  });

export default FolderButton;
