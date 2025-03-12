import {useContext, useMemo} from 'react';
import {SnsShareDrawerContext} from '../../SnsShareDrawerContext';
import LineLogo from '../../../../assets/line_circle_logo.png';

// 라인 버튼
const LineShareButton = () => {
  const context = useContext(SnsShareDrawerContext);
  const snsShareDataContext = useMemo(
    () => context?.snsShareData,
    [context?.snsShareData]
  );
  const defaultContext = useMemo(
    () => context?.defaultSnsShareData,
    [context?.defaultSnsShareData]
  );

  const encodedTitle = useMemo(() => {
    if (snsShareDataContext?.snsData?.line?.title) {
      return encodeURIComponent(
        snsShareDataContext?.snsData.line?.title + '\n'
      );
    } else if (snsShareDataContext?.title) {
      return encodeURIComponent(snsShareDataContext?.title + '\n');
    } else if (defaultContext?.snsData?.line?.title) {
      return encodeURIComponent(defaultContext?.snsData?.line.title + '\n');
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.line?.title,
    snsShareDataContext?.snsData?.line?.title,
    snsShareDataContext?.title,
  ]);

  const encodeUrl = useMemo(() => {
    if (snsShareDataContext?.snsData?.line?.url) {
      return encodeURIComponent(snsShareDataContext?.snsData.line?.url);
    } else if (snsShareDataContext?.url) {
      return encodeURIComponent(snsShareDataContext?.url);
    } else if (defaultContext?.snsData?.line?.url) {
      return encodeURIComponent(defaultContext?.snsData?.line.url);
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.line?.url,
    snsShareDataContext?.snsData?.line?.url,
    snsShareDataContext?.url,
  ]);

  const width = useMemo(() => {
    if (snsShareDataContext?.snsData?.line?.width !== undefined) {
      return snsShareDataContext?.snsData?.line?.width;
    } else if (snsShareDataContext?.width !== undefined) {
      return snsShareDataContext?.width;
    } else if (defaultContext?.snsData?.line?.width !== undefined) {
      return defaultContext?.snsData?.line?.width;
    } else if (defaultContext?.width !== undefined) {
      return defaultContext?.width;
    } else {
      return context?.defaultWidth;
    }
  }, [
    context?.defaultWidth,
    defaultContext?.snsData?.line?.width,
    defaultContext?.width,
    snsShareDataContext?.snsData?.line?.width,
    snsShareDataContext?.width,
  ]);

  const height = useMemo(() => {
    if (snsShareDataContext?.snsData?.line?.height !== undefined) {
      return snsShareDataContext?.snsData?.line?.height;
    } else if (snsShareDataContext?.height !== undefined) {
      return snsShareDataContext?.height;
    } else if (defaultContext?.snsData?.line?.height !== undefined) {
      return defaultContext?.snsData?.line?.height;
    } else if (defaultContext?.height !== undefined) {
      return defaultContext?.height;
    } else {
      return context?.defaultHeight;
    }
  }, [
    snsShareDataContext?.snsData?.line?.height,
    snsShareDataContext?.height,
    defaultContext?.snsData?.line?.height,
    defaultContext?.height,
    context?.defaultHeight,
  ]);

  const usable = useMemo(() => {
    if (snsShareDataContext?.snsData?.line?.usable !== undefined) {
      return snsShareDataContext?.snsData?.line?.usable;
    } else if (snsShareDataContext?.usable !== undefined) {
      return snsShareDataContext?.usable;
    } else if (defaultContext?.snsData?.line?.usable !== undefined) {
      return defaultContext?.snsData?.line?.usable;
    } else if (defaultContext?.usable !== undefined) {
      return defaultContext?.usable;
    } else {
      return false;
    }
  }, [
    defaultContext?.snsData?.line?.usable,
    defaultContext?.usable,
    snsShareDataContext?.snsData?.line?.usable,
    snsShareDataContext?.usable,
  ]);

  const commonFeatures = useMemo(
    () => `width=${width}, height=${height}`,
    [width, height]
  );

  const onClickLineShare = () => {
    window.open(
      `https://line.me/R/msg/text/?${encodedTitle}${encodeUrl}`,
      'line',
      commonFeatures
    );
  };

  if (!encodeUrl || !usable) {
    return <></>;
  }

  return (
    <li>
      <button className="sns-btn" onClick={onClickLineShare}>
				<img src={LineLogo} alt="line logo" />
      </button>
    </li>
  );
};

export default LineShareButton;
