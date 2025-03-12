import {useContext, useMemo} from 'react';
import {SnsShareDrawerContext} from '../../SnsShareDrawerContext';
import EmailLogo from '../../../../assets/email_circle_logo.png';

// 메일 버튼
const EmailShareButton = () => {
  const context = useContext(SnsShareDrawerContext);
  const snsShareDataContext = useMemo(
    () => context?.snsShareData,
    [context?.snsShareData]
  );
  const defaultContext = useMemo(
    () => context?.defaultSnsShareData,
    [context?.defaultSnsShareData]
  );

  const encodeAddressee = useMemo(() => {
    if (snsShareDataContext?.snsData?.email?.addressee !== undefined) {
      return encodeURIComponent(snsShareDataContext?.snsData.email?.addressee);
    } else if (defaultContext?.snsData?.email?.addressee !== undefined) {
      return encodeURIComponent(defaultContext?.snsData.email?.addressee);
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.email?.addressee,
    snsShareDataContext?.snsData?.email?.addressee,
  ]);

  const encodeSubject = useMemo(() => {
    if (snsShareDataContext?.snsData?.email?.subject !== undefined) {
      return encodeURIComponent(snsShareDataContext?.snsData.email?.subject);
    } else if (snsShareDataContext?.title !== undefined) {
      return encodeURIComponent(snsShareDataContext?.title);
    } else if (defaultContext?.snsData?.email?.subject !== undefined) {
      return encodeURIComponent(defaultContext?.snsData.email?.subject);
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.email?.subject,
    snsShareDataContext?.snsData?.email?.subject,
    snsShareDataContext?.title,
  ]);

  const encodeBody = useMemo(() => {
    if (snsShareDataContext?.snsData?.email?.body !== undefined) {
      return encodeURIComponent(snsShareDataContext?.snsData.email?.body);
    } else if (snsShareDataContext?.url !== undefined) {
      return encodeURIComponent(snsShareDataContext?.url);
    } else if (defaultContext?.snsData?.email?.body !== undefined) {
      return encodeURIComponent(defaultContext?.snsData.email?.body);
    } else {
      return encodeURIComponent('');
    }
  }, [
    defaultContext?.snsData?.email?.body,
    snsShareDataContext?.snsData?.email?.body,
    snsShareDataContext?.url,
  ]);

  const usable = useMemo(() => {
    if (snsShareDataContext?.snsData?.email?.usable !== undefined) {
      return snsShareDataContext?.snsData?.email?.usable;
    } else if (snsShareDataContext?.usable !== undefined) {
      return snsShareDataContext?.usable;
    } else if (defaultContext?.snsData?.email?.usable !== undefined) {
      return defaultContext?.snsData?.email?.usable;
    } else if (defaultContext?.usable !== undefined) {
      return defaultContext?.usable;
    } else {
      return false;
    }
  }, [
    defaultContext?.snsData?.email?.usable,
    defaultContext?.usable,
    snsShareDataContext?.snsData?.email?.usable,
    snsShareDataContext?.usable,
  ]);

  if (!encodeBody || !usable) {
    return <></>;
  }

  return (
    <li>
      <a
        className="sns-btn"
        href={`mailto:${encodeAddressee}?subject=${encodeSubject}&body=${encodeBody}`}>
				<img src={EmailLogo} alt="email icon" />
      </a>
    </li>
  );
};

export default EmailShareButton;
