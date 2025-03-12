import {useCallback} from 'react';
import {useSnsShareDrawer} from '../useSnsShareDrawer';

export const SnsShareBackDrop = () => {
  const {isOpen, onClose, drawerBg} = useSnsShareDrawer();

  // drawer 닫기 함수
  const onClickCloseDrawer = useCallback(() => {
    if (isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`sns__share__backdrop ${drawerBg ? '' : 'no-drawer-bg'}`}
      onClick={onClickCloseDrawer}></div>
  );
};
