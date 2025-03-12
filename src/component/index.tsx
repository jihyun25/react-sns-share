import { useCallback } from "react";
import { useSnsShareDrawer } from "../lib/sns-share-hook/useSnsShareDrawer";

export const Test = () => {
    const { onOpen } = useSnsShareDrawer();

    const onClickOpenModal = useCallback(() => {
        onOpen();
    }, [onOpen]);

    const onClickOpenModal2 = useCallback(() => {
        onOpen(
            {
                url: "https://www.naver.com/",
                title: "공유하기 공통 test title",
                description: "공유하기 공통 test description",
                imageUrl: "",
                width: 600,
                height: 600,
                // usable: true,
                snsData: {
                    // 카카오 확인 (필수값 O, kakaoId, imageUrl, title, btnTitle)
                    kakao: {
                        // kakaoId: '사용자의 kakaoId',
                        title: "kakao test title222",
                        description: "test description222",
                        imageUrl: "",
                        link: "https://www.naver.com/",
                        btnTitle: "공유하기222",
                        btnLink: "https://www.naver.com/",
                        // usable: false,
                    },
                    // 라인 확인 (필수값 X)
                    line: {
                        title: "line test title222",
                        url: "https://www.naver.com/",
                        // width: 0,
                        // height: 0,
                        // usable: true,
                    },
                    // 네이버 블로그 확인 (필수값 O, title => 공유 가능한 url이 아닐 경우에는 url이 공유 안됨)
                    naver: {
                        title: "naver test title222",
                        url: "https://www.naver.com/",
                        // width: 0,
                        // height: 0,
                        // usable: true,
                    },
                    // 트위터 확인 (필수값 X)
                    twitter: {
                        text: "twitter test title222",
                        url: "https://www.naver.com/",
                        hashtags: "hashtag1, hashtags2, hashtags3, hashtags4",
                        // width: 0,
                        // height: 0,
                        // usable: true,
                    },
                    // 밴드 확인 (필수값 X)
                    // 크기조절 안됨
                    band: {
                        message: "band test title222",
                        url: "https://www.naver.com/",
                        // width: 0,
                        // height: 0,
                        // usable: true,
                    },
                    // email 확인 (필수값 X)
                    email: {
                        addressee:
                            "test1@gmail.com, test2@gmail.com, test3@gmail.com, test4@gmail.com",
                        subject: "email test title222",
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
            },
            false
        );
    }, [onOpen]);

    return (
        <div className="share-btn">
            <div>
                <button onClick={onClickOpenModal}>
                    sns share (context api + hook) - custom X (default sns data)
                </button>
                <button onClick={onClickOpenModal2}>
                    sns share (context api + hook) - custom O
                </button>
            </div>
        </div>
    );
};
