## 목표하는 것

이 애플리케이션은 사용자가 원하는 페이지를 소셜 네트워킹 시스템에 공유할 수 있는 modal 또는 drawer을 생성합니다.

This application creates a modal or drawer for users to Share their wants pages to Social Networking Systems.

### mobile

<img width="384" alt="social-share-mo" src="https://github.com/user-attachments/assets/707dc589-8b97-45f7-ab96-e401b5218f3a" />

### tablet

<img width="564" alt="social-share-tablet" src="https://github.com/user-attachments/assets/50454cef-f907-4d58-b2e0-bff8ac0caafb" />

### pc

<img width="1397" alt="social-share-pc" src="https://github.com/user-attachments/assets/14dd24bf-aa4d-42ea-87dc-8710c0f77508" />

<br />

## social 종류

-   kakao
-   line
-   naver
-   twitter
-   band
-   email
-   facebook

    ※ **공통 url이 있을 때** navigator.share() 사용이 가능한 환경에서는 navigator.share(), 그 외에는 clipboard 복사 기능 노출

<br />

## react-sns-share 설치

```
npm install react-sns-share
```

<br />

## 사용법

애플리케이션 루트에 있는 컴포넌트들을 SnsShareDrawerProvider 컴포넌트로 감싸고 style.css를 import합니다.

-> 하위 component에서 useSnsShareDrawer hook 사용이 가능합니다.

-> 기본 drawer/modal 스타일이 적용됩니다.

<br />

## 사용법 (예시)

#### App.tsx

-   defaultData (초기값) 설정

```javascript
function App() {
    const defaultData = {
        width: 0,
        height: 0,
        imageUrl: "",
        usable: true,
        snsData: {
            kakao: {
                kakaoId: "",
                title: "kakao test title",
                description: "test description",
                imageUrl: "",
                link: "https://test.com",
                btnTitle: "공유하기",
                btnLink: "https://test.com",
                usable: true,
            },
            line: {
                title: "line test title",
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
            naver: {
                title: "naver test title",
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
            twitter: {
                text: "twitter test title",
                url: "https://test.com",
                hashtags: "hashtag1, hashtags2",
                width: 0,
                height: 0,
                usable: true,
            },
            band: {
                message: "band test title",
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
            email: {
                addressee: "test1@gmail.com, test2@gmail.com",
                subject: "email test title",
                body: "https://test.com",
                usable: true,
            },
            facebook: {
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
        },
    };

    return (
        // context api를 사용하기 위해선 App.tsx에서 context 관련 컴포넌트로 감싸줘야함
        // App.tsx에서 SnsShareDrawerProvider 컴포넌트를 선언해주면 모든 페이지에서 useSnsShareDrawer hook 사용 가능!
        <SnsShareDrawerProvider defaultData={defaultData}>
            {children}
        </SnsShareDrawerProvider>
    );
}

export default App;
```

<br />

#### social share 모달 사용을 희망하는 파일

```javascript
const { onOpen } = useSnsShareDrawer(); // hook 불러오기

// App.tsx에서 세팅한 defaultProps 값을 사용할 때
const onClickOpenModal = useCallback(() => {
    onOpen();
}, [onOpen]);

// 각각의 페이지에서 social share를 커스텀 하고 싶을 때
const onClickOpenModal2 = useCallback(() => {
    onOpen(
        {
            url: "https://test.com",
            title: "공유하기 공통 test title",
            description: "공유하기 공통 test description",
            imageUrl: "",
            width: 0,
            height: 0,
            usable: true,
            snsData: {
                kakao: {
                    kakaoId: "",
                    title: "kakao test title222",
                    description: "test description222",
                    imageUrl: "",
                    link: "https://test.com",
                    btnTitle: "공유하기222",
                    btnLink: "https://test.com",
                    usable: false,
                },
                line: {
                    title: "line test title222",
                    url: "https://test.com",
                    width: 0,
                    height: 0,
                    usable: true,
                },
                naver: {
                    title: "naver test title222",
                    url: "https://test.com",
                    width: 0,
                    height: 0,
                    usable: true,
                },
                twitter: {
                    text: "twitter test title222",
                    url: "https://test.com",
                    hashtags: "hashtag1, hashtags2, hashtags3, hashtags4",
                    width: 0,
                    height: 0,
                    usable: true,
                },
                band: {
                    message: "band test title222",
                    url: "https://test.com",
                    width: 0,
                    height: 0,
                    usable: true,
                },
                email: {
                    addressee:
                        "test1@gmail.com, test2@gmail.com, test3@gmail.com, test4@gmail.com",
                    subject: "email test title222",
                    body: "https://test.com",
                    usable: true,
                },
                facebook: {
                    url: "https://test.com",
                    width: 0,
                    height: 0,
                    usable: true,
                },
            },
        },
        false
    );
}, [onOpen]);
```

<br />

## 속성

#### 공통 data

| key         | type    | default value | 사용 가능 위치                 | 적용 sns                                                                                                |
| ----------- | ------- | ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| width       | number  | 600           | defaultData, onOpen 함수 props | - line <br />- naver <br />- twitter <br />- band <br />- facebook                                      |
| height      | number  | 600           | defaultData, onOpen 함수 props | - line <br />- naver <br />- twitter <br />- band <br />- facebook                                      |
| imageUrl    | string  | ‘’            | defaultData, onOpen 함수 props | - kakao <br />- navigator.share()                                                                       |
| usable      | boolean | false         | defaultData, onOpen 함수 props | All                                                                                                     |
| url         | string  | ‘’            | onOpen 함수 props              | All                                                                                                     |
| title       | string  | ‘’            | onOpen 함수 props              | - kakao <br />- line <br />- naver <br />- twitter <br />- band <br />- email <br />- navigator.share() |
| description | string  | ‘’            | onOpen 함수 props              | - kakao <br />- navigator.share()                                                                       |

<br />

#### snsData

-   kakao
    | key | type | snsData required |
    | ----------- | ------- | ------------- |
    | kakaoId | string |O |
    | title | string | O |
    | description | string | X |
    | imageUrl | string | O (not null) |
    | link | string | O |
    | btnTitle | string | X |
    | btnLink | string | X |
    | usable | boolean | O (default false) |

<br />

-   line
    | key | type | snsData required |
    | ----------- | ------- | ------------- |
    | title | string | X |
    | url | string | O |
    | width | number | X |
    | height | number | X |
    | usable | boolean | O (default false) |

<br />

-   naver
    | key | type | snsData required |
    | ----------- | ------- | ------------- |
    | title | string | O |
    | url | string | O |
    | width | number | X |
    | height | number | X |
    | usable | boolean | O (default false) |

<br />

-   twitter
    | key | type | snsData required |
    | ----------- | ------- | ------------- |
    | text | string | X |
    | url | string | O |
    | hashtags | string | X |
    | width | number | X |
    | height | number | X |
    | usable | boolean | O (default false) |

<br />

-   band
    | key | type | snsData required |
    | ----------- | ------- | ------------- |
    | message | string | X |
    | url | string | O |
    | width | number | X |
    | height | number | X |
    | usable | boolean | O (default false) |

<br />

-   email
    | key | type | snsData required |
    | ----------- | ------- | ------------- |
    | addressee | string | X |
    | subject | string | X |
    | body | string | O |
    | usable | boolean | O (default false) |

<br />

-   facebook
    | key | type | snsData required |
    | ----------- | ------- | ------------- |
    | url | string | O |
    | width | number | X |
    | height | number | X |
    | usable | boolean | O (default false) |

<br />

## 속성 우선순위

> onOpen Object.snsData > onOpen Object > defaultData.snsData > defaultData

> 상위에서 사용된 값을 그대로 사용하고 싶지 않을 경우 우선순위가 더 높은 하위에서 가공 <br />
> ex. 전체적으로는 모든 공유 버튼을 사용하고 싶지만 특정 페이지에서만 kakao 버튼만 사용하고 싶을 경우 하위에서 가공

1. 각 페이지 social share Object snsData

    ```javascript
    onOpen({
        snsData: {
            kakao: {
                kakaoId: "",
                title: "kakao test title",
                description: "test description",
                imageUrl: "",
                link: "https://test.com",
                btnTitle: "공유하기",
                btnLink: "https://test.com",
                usable: true,
            },
            line: {
                title: "line test title",
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
            naver: {
                title: "naver test title",
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
            twitter: {
                text: "twitter test title",
                url: "https://test.com",
                hashtags: "hashtag1, hashtags2",
                width: 0,
                height: 0,
                usable: true,
            },
            band: {
                message: "band test title",
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
            email: {
                addressee: "test1@gmail.com, test2@gmail.com",
                subject: "email test title",
                body: "https://test.com",
                usable: true,
            },
            facebook: {
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
        },
    });
    ```

<br />

2. 각 페이지 social share Object 최상위 key, value (url, title, description, imageUrl, width, height, usable)
    ```javascript
    onOpen({
        width: 0,
        height: 0,
        imageUrl: "",
        usable: true,
    });
    ```

<br />

3. App.tsx defaultData snsData
    ```javascript
    const defaultData = {
        snsData: {
            kakao: {
                kakaoId: "",
                title: "kakao test title",
                description: "test description",
                imageUrl: "",
                link: "https://test.com",
                btnTitle: "공유하기",
                btnLink: "https://test.com",
                usable: true,
            },
            line: {
                title: "line test title",
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
            naver: {
                title: "naver test title",
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
            twitter: {
                text: "twitter test title",
                url: "https://test.com",
                hashtags: "hashtag1, hashtags2",
                width: 0,
                height: 0,
                usable: true,
            },
            band: {
                message: "band test title",
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
            email: {
                addressee: "test1@gmail.com, test2@gmail.com",
                subject: "email test title",
                body: "https://test.com",
                usable: true,
            },
            facebook: {
                url: "https://test.com",
                width: 0,
                height: 0,
                usable: true,
            },
        },
    };
    ```

<br />

4. App.tsx defaultData 최상위 key, value (width, height, imageUrl, usable)
    ```javascript
    const defaultData = {
        width: 0,
        height: 0,
        imageUrl: "",
        usable: true,
    };
    ```

<br />

## 주의할 점

-   defaultData와 onOpen 함수 social share props data 형식이 다름
-   url이 빈 값(’’)이거나 값을 넘겨주지 않았을 경우(undefined) 모든 버튼은 노출 안됨
-   usable이 false이면 노출 안됨 (초기값은 false, 사용자가 노출시키고 싶은 sns에 usable true 설정 필요)
-   width, height는 default 값 600, 600 (공유하기 창의 크기)
    -   full-size로 공유하기 창을 띄우고 싶다면 width, height에 0을 넘겨주면 됨
    -   width, height 속성은 window.open을 사용하는 공유하기 버튼(line, naver. twitter, band, facebook)에만 적용될 값
-   useSnsShareDrawer hook onOpen 함수의 두 번째 props로 social share modal/drawer 배경 색상 유무 제어 가능
    -   false : 투명 배경색
    -   true (default) : 검은 반투명 배경색
-   각 페이지 onOpen 함수 props social share Object 최상위 title, description, url, imageUrl로 navigator.share() / clipboard 복사하기 기능 사용
    -   social share Object 최상위 url이 없을 경우 navigator.share() 비노출, clipboard 복사하기 기능 동작 안함
-   kakao, naver는 필수값 존재
    -   kakao : kakaoId, title이 없을 경우 비노출
    -   naver : title이 없을 경우 비노출
-   사용자가 설정한 social share data 우선순위에 따라 화면 노출이 달라짐
-   모든 값은 선택값이며, 상위(App.tsx)에서 사용된 값을 그대로 사용하고 싶지 않을 때 하위에서 가공
