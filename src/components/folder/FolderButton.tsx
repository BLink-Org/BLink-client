import {useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DownIcon, EditIcon, UpIcon} from '@/assets/icons/modal';
import {FONTS} from '@/constants';
import {useThemeStore} from '@/store/useThemeStore';
import {DeleteIcon, PencilIcon} from '@/assets/icons/mypage';
import DropDownModal from '../modal/DropDownModal';

interface FolderButtonProps {
  variants: 'pressed' | 'activated' | 'default';
  name?: string;
  number?: number;
  onPress: () => void;
  handleSelect?: (label: string) => void;
}

const FolderButton = ({
  variants,
  name,
  number,
  onPress,
  handleSelect = () => {},
}: FolderButtonProps) => {
  const {theme} = useThemeStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeDropdown = () => setIsDropdownOpen(false);
  const [anchorPosition, setAnchorPosition] = useState({x: 0, y: 0});
  const buttonRef = useRef<TouchableOpacity>(null);

  const toggleDropdown = () => {
    buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setIsDropdownOpen(true);
      setAnchorPosition({x: pageX, y: pageY + height});
    });
  };

  const folderOptions = useMemo(
    () => [
      {
        label: '폴더명 수정',
        icon: <PencilIcon />,
        onSelect: () => {
          closeDropdown();
          handleSelect('폴더명 수정');
        },
      },
      {
        label: '위로 이동',
        icon: <UpIcon />,
        onSelect: () => {
          closeDropdown();
          handleSelect('위로 이동');
        },
      },
      {
        label: '아래로 이동',
        icon: <DownIcon />,
        onSelect: () => {
          closeDropdown();
          handleSelect('아래로 이동');
        },
      },
      {
        label: '삭제',
        icon: <DeleteIcon />,
        onSelect: () => {
          closeDropdown();
          handleSelect('영구삭제');
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
          backgroundColor: name ? theme.TEXT100 : '#ffffff',
          borderColor: theme.TEXT200,
        };
    }
  })();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variantStyles,
        {borderStyle: name ? 'solid' : 'dashed'},
      ]}
      onPress={onPress}>
      <View style={styles.infocontainer}>
        <Text style={[FONTS.BODY1_MEDIUM, {color: theme.TEXT900, flex: 1}]}>
          {name ?? '폴더 없이 저장'}
        </Text>
        {number && (
          <View style={styles.detailContainer}>
            <Text style={[FONTS.BODY2_MEDIUM, {color: theme.TEXT700}]}>
              {number}
            </Text>
            <TouchableOpacity ref={buttonRef} onPress={toggleDropdown}>
              <EditIcon />
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
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 58,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#000',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  infocontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailContainer: {
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FolderButton;
