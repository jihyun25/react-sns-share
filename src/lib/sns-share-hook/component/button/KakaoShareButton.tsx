import { useCallback, useContext, useEffect, useMemo } from "react";
import { SnsShareDrawerContext } from "../../SnsShareDrawerContext";
import KakaoLogo from "../../../../assets/kakao_circle_logo.png";

// 카카오톡 버튼
const KakaoShareButton = () => {
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
    if (snsShareDataContext?.snsData?.kakao?.title !== undefined) {
      return snsShareDataContext?.snsData.kakao?.title;
    } else if (snsShareDataContext?.title !== undefined) {
      return snsShareDataContext?.title;
    } else if (defaultContext?.snsData?.kakao?.title !== undefined) {
      return defaultContext?.snsData?.kakao.title;
    } else {
      return "";
    }
  }, [
    defaultContext?.snsData?.kakao?.title,
    snsShareDataContext?.snsData?.kakao?.title,
    snsShareDataContext?.title,
  ]);

  const description = useMemo(() => {
    if (snsShareDataContext?.snsData?.kakao?.description !== undefined) {
      return snsShareDataContext?.snsData.kakao?.description;
    } else if (snsShareDataContext?.description !== undefined) {
      return snsShareDataContext?.description;
    } else if (defaultContext?.snsData?.kakao?.description !== undefined) {
      return defaultContext?.snsData?.kakao.description;
    } else {
      return "";
    }
  }, [
    defaultContext?.snsData?.kakao?.description,
    snsShareDataContext?.snsData?.kakao?.description,
    snsShareDataContext?.description,
  ]);

  const imageUrl = useMemo(() => {
    if (snsShareDataContext?.snsData?.kakao?.imageUrl !== undefined) {
      return snsShareDataContext?.snsData.kakao?.imageUrl;
    } else if (snsShareDataContext?.imageUrl !== undefined) {
      return snsShareDataContext?.imageUrl;
    } else if (defaultContext?.snsData?.kakao?.imageUrl !== undefined) {
      return defaultContext?.snsData?.kakao.imageUrl;
    } else if (defaultContext?.imageUrl !== undefined) {
      return defaultContext?.imageUrl;
    } else {
      return "";
    }
  }, [
    defaultContext?.imageUrl,
    defaultContext?.snsData?.kakao?.imageUrl,
    snsShareDataContext?.imageUrl,
    snsShareDataContext?.snsData?.kakao?.imageUrl,
  ]);

  const link = useMemo(() => {
    if (snsShareDataContext?.snsData?.kakao?.link !== undefined) {
      return encodeURIComponent(snsShareDataContext?.snsData.kakao?.link);
    } else if (snsShareDataContext?.url !== undefined) {
      return encodeURIComponent(snsShareDataContext?.url);
    } else if (defaultContext?.snsData?.kakao?.link !== undefined) {
      return encodeURIComponent(defaultContext?.snsData?.kakao.link);
    } else {
      return encodeURIComponent("");
    }
  }, [
    defaultContext?.snsData?.kakao?.link,
    snsShareDataContext?.snsData?.kakao?.link,
    snsShareDataContext?.url,
  ]);

  const btnTitle = useMemo(() => {
    if (snsShareDataContext?.snsData?.kakao?.btnTitle !== undefined) {
      return snsShareDataContext?.snsData.kakao?.btnTitle;
    } else if (defaultContext?.snsData?.kakao?.btnTitle !== undefined) {
      return defaultContext?.snsData?.kakao.btnTitle;
    } else {
      return "";
    }
  }, [
    defaultContext?.snsData?.kakao?.btnTitle,
    snsShareDataContext?.snsData?.kakao?.btnTitle,
  ]);

  const btnLink = useMemo(() => {
    if (snsShareDataContext?.snsData?.kakao?.btnLink !== undefined) {
      return encodeURIComponent(snsShareDataContext?.snsData.kakao?.btnLink);
    } else if (defaultContext?.snsData?.kakao?.btnLink !== undefined) {
      return encodeURIComponent(defaultContext?.snsData?.kakao.btnLink);
    } else {
      return encodeURIComponent("");
    }
  }, [
    defaultContext?.snsData?.kakao?.btnLink,
    snsShareDataContext?.snsData?.kakao?.btnLink,
  ]);

  const usable = useMemo(() => {
    if (snsShareDataContext?.snsData?.kakao?.usable !== undefined) {
      return snsShareDataContext?.snsData?.kakao?.usable;
    } else if (snsShareDataContext?.usable !== undefined) {
      return snsShareDataContext?.usable;
    } else if (defaultContext?.snsData?.kakao?.usable !== undefined) {
      return defaultContext?.snsData?.kakao?.usable;
    } else if (defaultContext?.usable !== undefined) {
      return defaultContext?.usable;
    } else {
      return false;
    }
  }, [
    defaultContext?.snsData?.kakao?.usable,
    defaultContext?.usable,
    snsShareDataContext?.snsData?.kakao?.usable,
    snsShareDataContext?.usable,
  ]);

  const kakaoId = useMemo(() => {
    if (snsShareDataContext?.snsData?.kakao?.kakaoId !== undefined) {
      return snsShareDataContext?.snsData.kakao?.kakaoId;
    } else if (defaultContext?.snsData?.kakao?.kakaoId !== undefined) {
      return defaultContext?.snsData.kakao?.kakaoId;
    } else {
      return "";
    }
  }, [
    defaultContext?.snsData?.kakao?.kakaoId,
    snsShareDataContext?.snsData?.kakao?.kakaoId,
  ]);

  useEffect(() => {
    if (kakaoId) {
      const head = document.getElementsByTagName("head")[0];

      if (head && !document.getElementById("kakao-script")) {
        const script = document.createElement("script");
        script.id = "kakao-script";
        script.src = "https://developers.kakao.com/sdk/js/kakao.js";
        head.appendChild(script);
      }
    }

    if (window.Kakao) {
      window.Kakao.cleanup();
      window.Kakao.init(kakaoId);
    }
  }, [kakaoId]);

  const onClickKakaoShare = useCallback(() => {
    if (window.Kakao && window.Kakao.Share) {
      // 카카오톡 공유 버튼 생성
      window.Kakao.Share.sendDefault({
        objectType: "feed", // 공유 형식 (feed, text 등)
        content: {
          title: title, // 제목
          description: description, // 설명
          imageUrl: imageUrl, // 이미지 URL
          link: {
            mobileWebUrl: link, // 모바일 웹 링크
            webUrl: link, // 데스크탑 웹 링크
          },
        },
        buttons: [
          {
            title: btnTitle,
            link: {
              mobileWebUrl: btnLink, // 모바일 버튼 웹 링크
              webUrl: btnLink, // 데스크탑 버튼 웹 링크
            },
          },
        ],
      });
    }
  }, [btnLink, btnTitle, description, imageUrl, link, title]);

  if (!kakaoId || !title || !link || !usable) {
    return <></>;
  }

  return (
    <li>
      <button className="sns-btn" onClick={onClickKakaoShare}>
        <img src={KakaoLogo} alt="kakao logo" />
      </button>
    </li>
  );
};

export default KakaoShareButton;
