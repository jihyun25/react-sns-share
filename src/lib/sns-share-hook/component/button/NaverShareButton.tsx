import {useContext, useMemo} from 'react';
import {SnsShareDrawerContext} from '../../SnsShareDrawerContext';
import NaverLogo from '../../../../assets/naver_circle_logo.png';

// 네이버 버튼
const NaverShareButton = () => {
  const context = useContext(SnsShareDrawerContext);
  const snsShareDataContext = useMemo(
    () => context?.snsShareData,
    [context?.snsShareData]
  );
  const defaultContext = useMemo(
    () => context?.defaultSnsShareData,
    [context?.defaultSnsShareData]
  );

  const encodeTitle = useMemo(() => {
    if (snsShareDataContext?.snsData?.naver?.title !== undefined) {
      return encodeURIComponent(snsShareDataContext?.snsData.naver?.title);
    } else if (snsShareDataContext?.title) {
      return encodeURIComponent(snsShareDataContext?.title);
    } else if (defaultContext?.snsData?.naver?.title) {
      return encodeURIComponent(defaultContext?.snsData?.naver.title);
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.naver?.title,
    snsShareDataContext?.snsData?.naver?.title,
    snsShareDataContext?.title,
  ]);

  const encodeUrl = useMemo(() => {
    if (snsShareDataContext?.snsData?.naver?.url) {
      return encodeURIComponent(snsShareDataContext?.snsData.naver?.url);
    } else if (snsShareDataContext?.url) {
      return encodeURIComponent(snsShareDataContext?.url);
    } else if (defaultContext?.snsData?.naver?.url) {
      return encodeURIComponent(defaultContext?.snsData?.naver.url);
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.naver?.url,
    snsShareDataContext?.snsData?.naver?.url,
    snsShareDataContext?.url,
  ]);

  const width = useMemo(() => {
    if (snsShareDataContext?.snsData?.naver?.width !== undefined) {
      return snsShareDataContext?.snsData?.naver?.width;
    } else if (snsShareDataContext?.width !== undefined) {
      return snsShareDataContext?.width;
    } else if (defaultContext?.snsData?.naver?.width !== undefined) {
      return defaultContext?.snsData?.naver?.width;
    } else if (defaultContext?.width !== undefined) {
      return defaultContext?.width;
    } else {
      return context?.defaultWidth;
    }
  }, [
    context?.defaultWidth,
    defaultContext?.snsData?.naver?.width,
    defaultContext?.width,
    snsShareDataContext?.snsData?.naver?.width,
    snsShareDataContext?.width,
  ]);

  const height = useMemo(() => {
    if (snsShareDataContext?.snsData?.naver?.height !== undefined) {
      return snsShareDataContext?.snsData?.naver?.height;
    } else if (snsShareDataContext?.height !== undefined) {
      return snsShareDataContext?.height;
    } else if (defaultContext?.snsData?.naver?.height !== undefined) {
      return defaultContext?.snsData?.naver?.height;
    } else if (defaultContext?.height !== undefined) {
      return defaultContext?.height;
    } else {
      return context?.defaultHeight;
    }
  }, [
    snsShareDataContext?.snsData?.naver?.height,
    snsShareDataContext?.height,
    defaultContext?.snsData?.naver?.height,
    defaultContext?.height,
    context?.defaultHeight,
  ]);

  const usable = useMemo(() => {
    if (snsShareDataContext?.snsData?.naver?.usable !== undefined) {
      return snsShareDataContext?.snsData?.naver?.usable;
    } else if (snsShareDataContext?.usable !== undefined) {
      return snsShareDataContext?.usable;
    } else if (defaultContext?.snsData?.naver?.usable !== undefined) {
      return defaultContext?.snsData?.naver?.usable;
    } else if (defaultContext?.usable !== undefined) {
      return defaultContext?.usable;
    } else {
      return false;
    }
  }, [
    defaultContext?.snsData?.naver?.usable,
    defaultContext?.usable,
    snsShareDataContext?.snsData?.naver?.usable,
    snsShareDataContext?.usable,
  ]);

  const commonFeatures = useMemo(
    () => `width=${width}, height=${height}`,
    [width, height]
  );

  const onClickNaverShare = () => {
    window.open(
      `https://share.naver.com/web/shareView.nhn?url=${encodeUrl}&title=${encodeTitle}`,
      'naver',
      commonFeatures
    );
  };

  if (!encodeUrl || !usable || !encodeTitle) {
    return <></>;
  }

  return (
    <li>
      <button className="sns-btn" onClick={onClickNaverShare}>
				<img src={NaverLogo} alt="naver logo" />
      </button>
    </li>
  );
};

export default NaverShareButton;
