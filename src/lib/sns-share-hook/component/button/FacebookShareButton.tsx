import {useContext, useMemo} from 'react';
import {SnsShareDrawerContext} from '../../SnsShareDrawerContext';
import FacebookLogo from '../../../../assets/facebook_circle_logo.png';

// 페이스북 버튼
const FacebookShareButton = () => {
  const context = useContext(SnsShareDrawerContext);
  const snsShareDataContext = useMemo(
    () => context?.snsShareData,
    [context?.snsShareData]
  );
  const defaultContext = useMemo(
    () => context?.defaultSnsShareData,
    [context?.defaultSnsShareData]
  );

  const encodeUrl = useMemo(() => {
    if (snsShareDataContext?.snsData?.facebook?.url !== undefined) {
      return encodeURIComponent(snsShareDataContext?.snsData.facebook?.url);
    } else if (snsShareDataContext?.url !== undefined) {
      return encodeURIComponent(snsShareDataContext?.url);
    } else if (defaultContext?.snsData?.facebook?.url !== undefined) {
      return encodeURIComponent(defaultContext?.snsData?.facebook.url);
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.facebook?.url,
    snsShareDataContext?.snsData?.facebook?.url,
    snsShareDataContext?.url,
  ]);

  const width = useMemo(() => {
    if (snsShareDataContext?.snsData?.facebook?.width !== undefined) {
      return snsShareDataContext?.snsData?.facebook?.width;
    } else if (snsShareDataContext?.width !== undefined) {
      return snsShareDataContext?.width;
    } else if (defaultContext?.snsData?.facebook?.width !== undefined) {
      return defaultContext?.snsData?.facebook?.width;
    } else if (defaultContext?.width !== undefined) {
      return defaultContext?.width;
    } else {
      return context?.defaultWidth;
    }
  }, [
    context?.defaultWidth,
    defaultContext?.snsData?.facebook?.width,
    defaultContext?.width,
    snsShareDataContext?.snsData?.facebook?.width,
    snsShareDataContext?.width,
  ]);

  const height = useMemo(() => {
    if (snsShareDataContext?.snsData?.facebook?.height !== undefined) {
      return snsShareDataContext?.snsData?.facebook?.height;
    } else if (snsShareDataContext?.height !== undefined) {
      return snsShareDataContext?.height;
    } else if (defaultContext?.snsData?.facebook?.height !== undefined) {
      return defaultContext?.snsData?.facebook?.height;
    } else if (defaultContext?.height !== undefined) {
      return defaultContext?.height;
    } else {
      return context?.defaultHeight;
    }
  }, [
    snsShareDataContext?.snsData?.facebook?.height,
    snsShareDataContext?.height,
    defaultContext?.snsData?.facebook?.height,
    defaultContext?.height,
    context?.defaultHeight,
  ]);

  const usable = useMemo(() => {
    if (snsShareDataContext?.snsData?.facebook?.usable !== undefined) {
      return snsShareDataContext?.snsData?.facebook?.usable;
    } else if (snsShareDataContext?.usable !== undefined) {
      return snsShareDataContext?.usable;
    } else if (defaultContext?.snsData?.facebook?.usable !== undefined) {
      return defaultContext?.snsData?.facebook?.usable;
    } else if (defaultContext?.usable !== undefined) {
      return defaultContext?.usable;
    } else {
      return false;
    }
  }, [
    defaultContext?.snsData?.facebook?.usable,
    defaultContext?.usable,
    snsShareDataContext?.snsData?.facebook?.usable,
    snsShareDataContext?.usable,
  ]);

  const commonFeatures = useMemo(
    () => `width=${width}, height=${height}`,
    [width, height]
  );

  const onClickFacebookShare = () => {
    window.open(
      `http://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`,
      'facebook',
      commonFeatures
    );
  };

  if (!encodeUrl || !usable) {
    return <></>;
  }

  return (
    <li>
      <button className="sns-btn" onClick={onClickFacebookShare}>
				<img src={FacebookLogo} alt="facebook logo" />
      </button>
    </li>
  );
};

export default FacebookShareButton;
