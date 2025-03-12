import {useContext, useMemo} from 'react';
import {SnsShareDrawerContext} from '../../SnsShareDrawerContext';
import TwitterLogo from '../../../../assets/x_circle_logo.png';

// 트위터 버튼
const TwitterShareButton = () => {
  const context = useContext(SnsShareDrawerContext);
  const snsShareDataContext = useMemo(
    () => context?.snsShareData,
    [context?.snsShareData]
  );
  const defaultContext = useMemo(
    () => context?.defaultSnsShareData,
    [context?.defaultSnsShareData]
  );

  const encodeText = useMemo(() => {
    if (snsShareDataContext?.snsData?.twitter?.text) {
      return encodeURIComponent(
        snsShareDataContext?.snsData.twitter?.text + '\n'
      );
    } else if (snsShareDataContext?.title) {
      return encodeURIComponent(snsShareDataContext?.title + '\n');
    } else if (defaultContext?.snsData?.twitter?.text) {
      return encodeURIComponent(defaultContext?.snsData?.twitter?.text + '\n');
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.twitter?.text,
    snsShareDataContext?.snsData?.twitter?.text,
    snsShareDataContext?.title,
  ]);

  const encodeUrl = useMemo(() => {
    if (snsShareDataContext?.snsData?.twitter?.url) {
      return encodeURIComponent(
        snsShareDataContext?.snsData.twitter?.url + '\n'
      );
    } else if (snsShareDataContext?.url) {
      return encodeURIComponent(snsShareDataContext?.url + '\n');
    } else if (defaultContext?.snsData?.twitter?.url) {
      return encodeURIComponent(defaultContext?.snsData?.twitter.url + '\n');
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.twitter?.url,
    snsShareDataContext?.snsData?.twitter?.url,
    snsShareDataContext?.url,
  ]);

  const encodeHashtag = useMemo(() => {
    if (snsShareDataContext?.snsData?.twitter?.hashtags) {
      return encodeURIComponent(
        snsShareDataContext?.snsData?.twitter?.hashtags
      );
    } else if (defaultContext?.snsData?.twitter?.hashtags) {
      return encodeURIComponent(defaultContext?.snsData?.twitter?.hashtags);
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.twitter?.hashtags,
    snsShareDataContext?.snsData?.twitter?.hashtags,
  ]);

  const width = useMemo(() => {
    if (snsShareDataContext?.snsData?.twitter?.width !== undefined) {
      return snsShareDataContext?.snsData?.twitter?.width;
    } else if (snsShareDataContext?.width !== undefined) {
      return snsShareDataContext?.width;
    } else if (defaultContext?.snsData?.twitter?.width !== undefined) {
      return defaultContext?.snsData?.twitter?.width;
    } else if (defaultContext?.width !== undefined) {
      return defaultContext?.width;
    } else {
      return context?.defaultWidth;
    }
  }, [
    context?.defaultWidth,
    defaultContext?.snsData?.twitter?.width,
    defaultContext?.width,
    snsShareDataContext?.snsData?.twitter?.width,
    snsShareDataContext?.width,
  ]);

  const height = useMemo(() => {
    if (snsShareDataContext?.snsData?.twitter?.height !== undefined) {
      return snsShareDataContext?.snsData?.twitter?.height;
    } else if (snsShareDataContext?.height !== undefined) {
      return snsShareDataContext?.height;
    } else if (defaultContext?.snsData?.twitter?.height !== undefined) {
      return defaultContext?.snsData?.twitter?.height;
    } else if (defaultContext?.height !== undefined) {
      return defaultContext?.height;
    } else {
      return context?.defaultHeight;
    }
  }, [
    snsShareDataContext?.snsData?.twitter?.height,
    snsShareDataContext?.height,
    defaultContext?.snsData?.twitter?.height,
    defaultContext?.height,
    context?.defaultHeight,
  ]);

  const usable = useMemo(() => {
    if (snsShareDataContext?.snsData?.twitter?.usable !== undefined) {
      return snsShareDataContext?.snsData?.twitter?.usable;
    } else if (snsShareDataContext?.usable !== undefined) {
      return snsShareDataContext?.usable;
    } else if (defaultContext?.snsData?.twitter?.usable !== undefined) {
      return defaultContext?.snsData?.twitter?.usable;
    } else if (defaultContext?.usable !== undefined) {
      return defaultContext?.usable;
    } else {
      return false;
    }
  }, [
    defaultContext?.snsData?.twitter?.usable,
    defaultContext?.usable,
    snsShareDataContext?.snsData?.twitter?.usable,
    snsShareDataContext?.usable,
  ]);

  const commonFeatures = useMemo(
    () => `width=${width}, height=${height}`,
    [width, height]
  );

  const onClickTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeText}&url=${encodeUrl}&hashtags=${encodeHashtag}`,
      'twitter',
      commonFeatures
    );
  };

  if (!encodeUrl || !usable) {
    return <></>;
  }

  return (
    <li>
      <button className="sns-btn" onClick={onClickTwitterShare}>
				<img src={TwitterLogo} alt="twitter logo" />
      </button>
    </li>
  );
};

export default TwitterShareButton;
