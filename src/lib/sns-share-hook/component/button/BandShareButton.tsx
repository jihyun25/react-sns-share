import {useContext, useMemo} from 'react';
import {SnsShareDrawerContext} from '../../SnsShareDrawerContext';
import BandLogo from '../../../../assets/band_circle_logo.png';

// 밴드 버튼
const BandShareButton = () => {
  const context = useContext(SnsShareDrawerContext);
  const snsShareDataContext = useMemo(
    () => context?.snsShareData,
    [context?.snsShareData]
  );
  const defaultContext = useMemo(
    () => context?.defaultSnsShareData,
    [context?.defaultSnsShareData]
  );

  const encodeMessage = useMemo(() => {
    if (snsShareDataContext?.snsData?.band?.message !== undefined) {
      return encodeURIComponent(
        snsShareDataContext?.snsData?.band?.message + '\n'
      );
    } else if (snsShareDataContext?.title !== undefined) {
      return encodeURIComponent(snsShareDataContext?.title + '\n');
    } else if (defaultContext?.snsData?.band?.message !== undefined) {
      return encodeURIComponent(defaultContext?.snsData?.band?.message + '\n');
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.band?.message,
    snsShareDataContext?.snsData?.band?.message,
    snsShareDataContext?.title,
  ]);

  const encodeUrl = useMemo(() => {
    if (snsShareDataContext?.snsData?.band?.url !== undefined) {
      return encodeURIComponent(snsShareDataContext?.snsData.band?.url);
    } else if (snsShareDataContext?.url !== undefined) {
      return encodeURIComponent(snsShareDataContext?.url);
    } else if (defaultContext?.snsData?.band?.url !== undefined) {
      return encodeURIComponent(defaultContext?.snsData?.band.url);
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.band?.url,
    snsShareDataContext?.snsData?.band?.url,
    snsShareDataContext?.url,
  ]);

  const width = useMemo(() => {
    if (snsShareDataContext?.snsData?.band?.width !== undefined) {
      return snsShareDataContext?.snsData?.band?.width;
    } else if (snsShareDataContext?.width !== undefined) {
      return snsShareDataContext?.width;
    } else if (defaultContext?.snsData?.band?.width !== undefined) {
      return defaultContext?.snsData?.band?.width;
    } else if (defaultContext?.width !== undefined) {
      return defaultContext?.width;
    } else {
      return context?.defaultWidth;
    }
  }, [
    context?.defaultWidth,
    defaultContext?.snsData?.band?.width,
    defaultContext?.width,
    snsShareDataContext?.snsData?.band?.width,
    snsShareDataContext?.width,
  ]);

  const height = useMemo(() => {
    if (snsShareDataContext?.snsData?.band?.height !== undefined) {
      return snsShareDataContext?.snsData?.band?.height;
    } else if (snsShareDataContext?.height !== undefined) {
      return snsShareDataContext?.height;
    } else if (defaultContext?.snsData?.band?.height !== undefined) {
      return defaultContext?.snsData?.band?.height;
    } else if (defaultContext?.height !== undefined) {
      return defaultContext?.height;
    } else {
      return context?.defaultHeight;
    }
  }, [
    snsShareDataContext?.snsData?.band?.height,
    snsShareDataContext?.height,
    defaultContext?.snsData?.band?.height,
    defaultContext?.height,
    context?.defaultHeight,
  ]);

  const usable = useMemo(() => {
    if (snsShareDataContext?.snsData?.band?.usable !== undefined) {
      return snsShareDataContext?.snsData?.band?.usable;
    } else if (snsShareDataContext?.usable !== undefined) {
      return snsShareDataContext?.usable;
    } else if (defaultContext?.snsData?.band?.usable !== undefined) {
      return defaultContext?.snsData?.band?.usable;
    } else if (defaultContext?.usable !== undefined) {
      return defaultContext?.usable;
    } else {
      return false;
    }
  }, [
    defaultContext?.snsData?.band?.usable,
    defaultContext?.usable,
    snsShareDataContext?.snsData?.band?.usable,
    snsShareDataContext?.usable,
  ]);

  const commonFeatures = useMemo(
    () => `width=${width}, height=${height}`,
    [width, height]
  );

  const onClickBandShare = () => {
    window.open(
      `https://band.us/plugin/share?body=${encodeMessage}${encodeUrl}`,
      'band',
      commonFeatures
    );
  };

  if (!encodeUrl || !usable) {
    return <></>;
  }

  return (
    <li>
      <button className="sns-btn" onClick={onClickBandShare}>
				<img src={BandLogo} alt="band logo" />
      </button>
    </li>
  );
};

export default BandShareButton;
