import { Test } from "./component";
import { SnsShareDrawerProvider } from "./lib/sns-share-hook/SnsShareDrawerProvider";

const App = () => {
  // 모든 페이지에서 사용할 기본값 (기본값으로 지정하고 싶은 공통 width, height, sns 채널과 각 채널에 필요한 데이터 설정)
  const defaultData =
    // width, height 속성은 window.open을 사용하는 공유하기 버튼에만 적용될 값 (공유하기 창의 크기)
    // width, height => 공유하기 새 창을 띄울 때 창의 크기 설정 (width, height 둘 중 하나만 없어도 full-size 새 창으로 뜸)
    {
      width: 0, // 공통 데이터
      height: 0, // 공통 데이터
      // imageUrl:
      //     "공통 imageUrl 이미지 링크",
      usable: true, // usable을 true로 설정해주지 않으면 초기값은 false (공유하기 버튼 노춡X)
      snsData: {
        // 카카오 확인 (필수값 O, kakaoId, title, imageUrl, link)
        kakao: {
          // kakaoId: '사용자의 kakaoId',
          title: "kakao test title",
          description: "test description",
          imageUrl: "",
          link: "https://www.naver.com/",
          btnTitle: "공유하기",
          btnLink: "https://www.naver.com/",
          // usable: true,
        },
        // 라인 확인 (필수값 X)
        line: {
          title: "line test title",
          url: "https://www.naver.com/",
          // width: 0,
          // height: 0,
          // usable: true,
        },
        // 네이버 블로그 확인 (필수값 O, title => 공유 가능한 url이 아닐 경우에는 url이 공유 안됨)
        naver: {
          title: "naver test title",
          url: "https://www.naver.com/",
          // width: 0,
          // height: 0,
          // usable: true,
        },
        // 트위터 확인 (필수값 X)
        twitter: {
          text: "twitter test title",
          url: "https://www.naver.com/",
          hashtags: "hashtag1, hashtags2",
          // width: 0,
          // height: 0,
          // usable: true,
        },
        // 밴드 확인 (필수값 X)
        // 크기조절 안됨
        band: {
          message: "band test title",
          url: "https://www.naver.com/",
          // width: 0,
          // height: 0,
          // usable: true,
        },
        // email 확인 (필수값 X)
        email: {
          addressee: "test1@gmail.com, test2@gmail.com",
          subject: "email test title",
          body: "https://www.naver.com/",
          // usable: true,
        },
        // facebook 확인 (필수값 X => 공유 가능한 url이 아닐 경우에는 url이 공유 안됨)
        facebook: {
          url: "https://www.naver.com/",
          // width: 0,
          // height: 0,
          // usable: true,
        },
      },
    };

  return (
    // context api를 사용하기 위해선 App.tsx에서 context 관련 컴포넌트로 감싸줘야함
    // App.tsx에서 SnsShareDrawerProvider 컴포넌트를 선언해주면 모든 페이지에서 useSnsShareDrawer hook 사용 가능!
    <SnsShareDrawerProvider defaultData={defaultData}>
      {/* <SnsShareDrawerProvider> */}
      <Test />
    </SnsShareDrawerProvider>
  );
};

export default App;
