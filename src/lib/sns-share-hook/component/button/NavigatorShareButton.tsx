import {useCallback, useContext, useMemo} from 'react';
import {SnsShareDrawerContext} from '../../SnsShareDrawerContext';

// Navigator.share() 버튼
const NavigatorShareButton = () => {
  const context = useContext(SnsShareDrawerContext);
  const snsShareDataContext = useMemo(
    () => context?.snsShareData,
    [context?.snsShareData]
  );
  const defaultContext = useMemo(
    () => context?.defaultSnsShareData,
    [context?.defaultSnsShareData]
  );

  const title = useMemo(() => {
    if (snsShareDataContext?.title !== undefined) {
      return snsShareDataContext?.title;
    } else {
      return '';
    }
  }, [snsShareDataContext?.title]);

  const description = useMemo(() => {
    if (snsShareDataContext?.description !== undefined) {
      return snsShareDataContext?.description;
    } else {
      return '';
    }
  }, [snsShareDataContext?.description]);

  const url = useMemo(() => {
    if (snsShareDataContext?.url !== undefined) {
      return snsShareDataContext?.url;
    } else {
      return '';
    }
  }, [snsShareDataContext?.url]);

  const imageUrl = useMemo(() => {
    if (snsShareDataContext?.imageUrl !== undefined) {
      return snsShareDataContext?.imageUrl;
    } else if (defaultContext?.imageUrl !== undefined) {
      return defaultContext?.imageUrl;
    } else {
      return '';
    }
  }, [defaultContext?.imageUrl, snsShareDataContext?.imageUrl]);

  const onClickNavigatorShare = useCallback(async () => {
    const response = await fetch(imageUrl);
    const data = await response.blob();
    const filename = imageUrl.split('/').pop();
    const urlToFile = new File([data], filename!, {type: data.type});

    try {
      await navigator.share({
        title: title,
        text: description,
        url: url,
        files: imageUrl ? [urlToFile] : undefined,
      });
    } catch (e: any) {
      console.error(e);
    }
  }, [title, description, url, imageUrl]);

  if (!url) {
    return <></>;
  }

  return (
    <li>
      <button className="navigator-share" onClick={onClickNavigatorShare}>
				<p>
					<span></span>
					<span></span>
					<span></span>
				</p>
      </button>
    </li>
  );
};

export default NavigatorShareButton;
