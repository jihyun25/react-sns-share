import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import KakaoShareButton from './button/KakaoShareButton';
import LineShareButton from './button/LineShareButton';
import NaverShareButton from './button/NaverShareButton';
import TwitterShareButton from './button/TwitterShareButton';
import BandShareButton from './button/BandShareButton';
import EmailShareButton from './button/EmailShareButton';
import FacebookShareButton from './button/FacebookShareButton';
import {useSnsShareDrawer} from '../useSnsShareDrawer';
import NavigatorShareButton from './button/NavigatorShareButton';
import ClipboardButton from './button/ClipboardButton';
import {SnsShareDrawerContext} from '../SnsShareDrawerContext';
import {SnsShareContentProps} from '../types';

export const SnsShareContent = () => {

  const {isOpen, onClose} = useSnsShareDrawer();
  const context = useContext(SnsShareDrawerContext);
  const snsShareContentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // 초기값
  const snsShareItem = useRef<SnsShareContentProps>({
    isSnsShareHeader: false,
		initial: {
			height: 0,
		},
    pointerType: {
      type: 'none',
    },
    touchStart: {
      snsShareContentHeight: 0,
      touchY: 0,
      timeStamp: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
      timeStamp: 0,
    },
    mouseDown: {
      snsShareContentHeight: 0,
      touchY: 0,
      timeStamp: 0,
    },
    mouseMove: {
      prevTouchY: 0,
      movingDirection: 'none',
      timeStamp: 0,
    },
  });

  const pointerTypeTouchHandler = useCallback((e: React.PointerEvent) => {
    // 터치 시작
    const handleTouchStart = (e: TouchEvent) => {
      const {touchStart, pointerType, initial} = snsShareItem.current;

      snsShareItem.current!.isSnsShareHeader = true;
      pointerType.type = 'touch';
      touchStart.snsShareContentHeight =
        snsShareContentRef.current!.clientHeight;
      touchStart.timeStamp = Math.floor(e.timeStamp);
      touchStart.touchY = Math.floor(e.touches[0].clientY);
			initial.height = snsShareContentRef.current!.clientHeight;
      snsShareContentRef.current!.style.height =
        touchStart.snsShareContentHeight + 'px';
      document.body.style.overflow = 'hidden';
    };

    // 터치 이동
    const handleTouchMove = (e: TouchEvent) => {
      if (!snsShareItem.current.isSnsShareHeader) {
        return;
      }

      const {touchStart, touchMove, initial} = snsShareItem.current;
      const screenHeight = window.innerHeight;
      const currentTouch = e.touches[0];
      touchMove.timeStamp = Math.floor(e.timeStamp);

      // 마우스 이동 타임스탬프 - 마우스 시작 타임스탬프를 뺀 값이 0.1초보다 작으면 리턴 (사용자가 움직임이 없다고 판단)
      if (touchMove.timeStamp - touchStart.timeStamp < 100) {
        return;
      }

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = Math.floor(touchStart.touchY);
      }

      if (touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = Math.floor(touchStart.touchY);
      }

      if (touchMove.prevTouchY < Math.floor(currentTouch.clientY)) {
        touchMove.movingDirection = 'down';

        const currentTouchHeight =
          screenHeight - Math.floor(currentTouch.clientY);
        snsShareContentRef.current!.style.height = currentTouchHeight + 'px';
        if (screenHeight * 0.9 < Math.floor(currentTouch.clientY)) {
          snsShareContentRef.current!.style.transition =
            'all 0.5s cubic-bezier(0.86, 0, 0.07, 1)';
          snsShareContentRef.current!.style.height = initial.height + 'px';
					onClose();
        } else {
          snsShareContentRef.current!.style.height = initial.height + 'px';
				}
      }

      if (touchMove.prevTouchY > Math.floor(currentTouch.clientY)) {
        touchMove.movingDirection = 'up';

        const currentTouchHeight =
          screenHeight - Math.floor(currentTouch.clientY);
        if (screenHeight * 0.9 < currentTouchHeight) {
          snsShareContentRef.current!.style.maxHeight =
            screenHeight * 0.9 + 'px';
        }
        snsShareContentRef.current!.style.transition = 'none';
        snsShareContentRef.current!.style.height = currentTouchHeight + 'px';
      }
    };

    // 터치 종료
    const handleTouchEnd = (e: TouchEvent) => {
      const {touchStart, touchMove} = snsShareItem.current;
      if (touchMove.movingDirection === 'up') {
        snsShareContentRef.current!.style.transition =
          'all 0.5s cubic-bezier(0.86, 0, 0.07, 1)';
        snsShareContentRef.current!.style.height =
          touchStart.snsShareContentHeight + 'px';
      }

      // 터치 종료시 초기화
      snsShareItem.current = {
        isSnsShareHeader: false,
				initial: {
					height: 0,
				},
        pointerType: {
          type: 'none',
        },
        touchStart: {
          snsShareContentHeight: 0,
          touchY: 0,
          timeStamp: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
          timeStamp: 0,
        },
        mouseDown: {
          snsShareContentHeight: 0,
          touchY: 0,
          timeStamp: 0,
        },
        mouseMove: {
          prevTouchY: 0,
          movingDirection: 'none',
          timeStamp: 0,
        },
      };
      snsShareItem.current!.isSnsShareHeader = false;
      document.body.style.overflow = 'auto';
    };

    headerRef.current!.addEventListener('touchstart', handleTouchStart);
    headerRef.current!.addEventListener('touchmove', handleTouchMove);
    headerRef.current!.addEventListener('touchend', handleTouchEnd);
  }, [onClose]);

  const pointerTypeMouseHandler = useCallback((e: React.PointerEvent) => {
    // 마우스 시작
    const handleMouseDown = (e: MouseEvent) => {
      const {mouseDown, pointerType, initial} = snsShareItem.current;
      snsShareItem.current!.isSnsShareHeader = true;
      pointerType.type = 'mouse';
      mouseDown.snsShareContentHeight =
        snsShareContentRef.current!.clientHeight;
      mouseDown.timeStamp = Math.floor(e.timeStamp);
      mouseDown.touchY = Math.floor(e.pageY);
			initial.height = snsShareContentRef.current!.clientHeight;
      snsShareContentRef.current!.style.height =
        mouseDown.snsShareContentHeight + 'px';
      document.body.style.overflow = 'hidden';
    };

    // 마우스 이동
    const handleMouseMove = (e: MouseEvent) => {
      if (!snsShareItem.current.isSnsShareHeader) {
        return;
      }

      const {mouseDown, mouseMove, initial} = snsShareItem.current;
      const screenHeight = window.innerHeight;
      const currentMouse = e.pageY;
      mouseMove.timeStamp = Math.floor(e.timeStamp);

      // 마우스 이동 타임스탬프 - 마우스 시작 타임스탬프를 뺀 값이 0.1초보다 작으면 리턴 (사용자가 움직임이 없다고 판단)
      if (mouseMove.timeStamp - mouseDown.timeStamp < 100) {
        return;
      }

      if (mouseMove.prevTouchY === undefined) {
        mouseMove.prevTouchY = Math.floor(mouseDown.touchY);
      }

      if (mouseMove.prevTouchY === 0) {
        mouseMove.prevTouchY = Math.floor(mouseDown.touchY);
      }

      if (mouseMove.prevTouchY < Math.floor(currentMouse)) {
        mouseMove.movingDirection = 'down';

        const currentMouseHeight = screenHeight - Math.floor(currentMouse);
        snsShareContentRef.current!.style.height = currentMouseHeight + 'px';
        if (screenHeight * 0.9 < Math.floor(currentMouse)) {
          snsShareContentRef.current!.style.transition =
            'all 0.5s cubic-bezier(0.86, 0, 0.07, 1)';
          snsShareContentRef.current!.style.height = initial.height + 'px';
					onClose();
        } else {
          snsShareContentRef.current!.style.height = initial.height + 'px';
				}
      }

      if (mouseMove.prevTouchY > Math.floor(currentMouse)) {
        mouseMove.movingDirection = 'up';

        const currentMouseHeight = screenHeight - Math.floor(currentMouse);

        if (screenHeight * 0.9 < currentMouseHeight) {
          snsShareContentRef.current!.style.maxHeight =
            screenHeight * 0.9 + 'px';
        }
        snsShareContentRef.current!.style.transition = 'none';
        snsShareContentRef.current!.style.height = currentMouseHeight + 'px';
      }
    };

    // 마우스 이동 종료
    const handleMouseUp = (e: MouseEvent) => {
      const {mouseDown, mouseMove} = snsShareItem.current;
      if (mouseMove.movingDirection === 'up') {
        snsShareContentRef.current!.style.transition =
          'all 0.5s cubic-bezier(0.86, 0, 0.07, 1)';
        snsShareContentRef.current!.style.height =
          mouseDown.snsShareContentHeight + 'px';
      }

      // 초기화
      snsShareItem.current = {
        isSnsShareHeader: false,
				initial: {
					height: 0,
				},
        pointerType: {
          type: 'none',
        },
        touchStart: {
          snsShareContentHeight: 0,
          touchY: 0,
          timeStamp: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
          timeStamp: 0,
        },
        mouseDown: {
          snsShareContentHeight: 0,
          touchY: 0,
          timeStamp: 0,
        },
        mouseMove: {
          prevTouchY: 0,
          movingDirection: 'none',
          timeStamp: 0,
        },
      };
      snsShareItem.current!.isSnsShareHeader = false;
      document.body.style.overflow = 'auto';
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onClose]);

  // pointerType에는 touch, mouse, pen이 있지만 pen은 추가 안함 (해당 포인터 타입에 따라 동작하는 함수 변경되도록 구현)
  const onPointerDownHandler = useCallback(
    (e: React.PointerEvent) => {
      switch (e.pointerType) {
        case 'touch':
          pointerTypeTouchHandler(e);
          break;
        case 'mouse':
          pointerTypeMouseHandler(e);
          break;
        default:
          console.log(`pointerType ${e.pointerType} is not supported`);
      }
    },
    [pointerTypeMouseHandler, pointerTypeTouchHandler]
  );

	const [screenWidth, setScreenWidth] = useState<number>(0);

	// 반응형 리사이징
	const resizeingHandler = useCallback(() => {
		setTimeout(() => {
			setScreenWidth(window.innerWidth);
		}, 250)
	}, []);

	useEffect(() => {
		setScreenWidth(window.innerWidth);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', resizeingHandler);
		return () => {
			window.removeEventListener('resize', resizeingHandler);
		};
	}, [resizeingHandler]);

  // drawer, popup이 떠있을 경우 화면 전체 스크롤 막기
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const body = document.querySelector('body') as HTMLBodyElement;
      if (isOpen) {
        body.style.overflow = 'hidden';
        if (snsShareContentRef.current && window.innerWidth < 767.98) {
					snsShareContentRef.current.style.bottom = '0px';
        }
      } else {
        body.style.overflow = 'scroll';
        if (snsShareContentRef.current && window.innerWidth < 767.98) {
          snsShareContentRef.current.style.bottom =
            '-' + snsShareContentRef.current!.clientHeight + 'px';
        } 
      }
    }
  }, [isOpen, screenWidth]);

  return (
    <div
      className={`sns__share__content ${isOpen ? 'drawer-open' : ''}`}
      ref={snsShareContentRef}>
      <div
        className="header"
        ref={headerRef}
        onPointerDown={onPointerDownHandler}>
        <div></div>
      </div>
      <div className="title">
        <span>공유하기</span>
      </div>
      <div className="body">
        {!context?.defaultSnsShareData && !context?.snsShareData ? (
          <p className="no-data">공유 할 데이터를 설정해주세요.</p>
        ) : (
          <ul>
            <KakaoShareButton />
            <LineShareButton />
            <NaverShareButton />
            <TwitterShareButton />
            <BandShareButton />
            <EmailShareButton />
            <FacebookShareButton />

            {'share' in navigator ? (
              <NavigatorShareButton />
            ) : (
              <ClipboardButton />
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
