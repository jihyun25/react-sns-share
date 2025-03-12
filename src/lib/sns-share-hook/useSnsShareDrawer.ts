import {useCallback, useContext} from 'react';
import {SnsShareDrawerContext} from './SnsShareDrawerContext';
import {SnsShareDataType, SnsShareDrawerHookType} from './types';

// DrawerContext를 사용하는 훅
export const useSnsShareDrawer = (): SnsShareDrawerHookType => {
  const context = useContext(SnsShareDrawerContext);

  if (!context) {
    throw new Error('Error');
  }

  // 모달을 열기
  const onOpen = useCallback(
    (data?: SnsShareDataType, bg?: boolean) => {
      context.setIsOpen(true);
      context.setDrawerBg(bg === undefined ? true : bg);

      if (data !== undefined) {
        context.setSnsShareData(data);
      } else {
        context.setSnsShareData(null);
      }
    },
    [context]
  );

  // 모달을 닫기
  const onClose = useCallback(() => {
    context.setIsOpen(false);
  }, [context]);

  return {
    isOpen: context.isOpen,
    onOpen,
    onClose,
    drawerBg: context.drawerBg,
    snsShareData: context.snsShareData,
  };
};
