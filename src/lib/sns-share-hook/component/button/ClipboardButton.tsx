import {useCallback, useContext, useMemo} from 'react';
import {SnsShareDrawerContext} from '../../SnsShareDrawerContext';
import ClipboardIcon from '../../../../assets/copy.png';

// 클립보드 복사하기 버튼
const ClipboardButton = () => {
  const context = useContext(SnsShareDrawerContext);
  const snsShareDataContext = useMemo(
    () => context?.snsShareData,
    [context?.snsShareData]
  );

  const url = useMemo(() => {
    if (snsShareDataContext?.url !== undefined) {
      return snsShareDataContext?.url;
    } else {
      return '';
    }
  }, [snsShareDataContext?.url]);

  // 클립보드 복사 함수
  const onClickClipboardCopy = useCallback(() => {
    navigator.clipboard.writeText(url);
  }, [url]);

  return (
    <li>
      <button className="clipboard-btn" onClick={onClickClipboardCopy}>
				<img src={ClipboardIcon} alt="clipboard icon" />
			</button>
    </li>
  );
};

export default ClipboardButton;
