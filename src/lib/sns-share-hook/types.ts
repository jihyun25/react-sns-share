declare global {
  interface Window {
    Kakao: any;
  }
}

export interface SnsShareDefaultDataType {
  width?: number;
  height?: number;
  usable?: boolean;
  imageUrl?: string;
  snsData?: CustomSnsShareDataType;
}

export interface SnsShareDataType {
  width?: number;
  height?: number;
  url?: string;
  title?: string;
  description?: string;
  usable?: boolean;
  imageUrl?: string;
  snsData?: CustomSnsShareDataType;
}

// Drawer Context type
export interface SnsShareDrawerContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  drawerBg: boolean;
  setDrawerBg: (drawerBg: boolean) => void;
  snsShareData: SnsShareDataType | null;
  setSnsShareData: (snsShareData: SnsShareDataType | null) => void;
  defaultSnsShareData: SnsShareDefaultDataType | null;
  defaultWidth: number;
  defaultHeight: number;
}

// Drawer hook type
export interface SnsShareDrawerHookType {
  isOpen: boolean;
  onOpen: (data?: SnsShareDataType, bg?: boolean) => void;
  onClose: () => void;
  drawerBg: boolean;
  snsShareData: SnsShareDataType | null;
}

export interface CustomSnsShareDataType {
  kakao?: KakaoShareProps;
  line?: LineShareProps;
  naver?: NaverShareProps;
  twitter?: TwitterShareProps;
  band?: BandShareProps;
  email?: EmailShareProps;
  facebook?: FacebookShareProps;
}

export interface KakaoShareProps {
  kakaoId?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  btnTitle?: string;
  btnLink?: string;
  usable?: boolean;
}

export interface LineShareProps {
  title?: string;
  url?: string;
  width?: number;
  height?: number;
  usable?: boolean;
}

export interface NaverShareProps {
  url?: string;
  title?: string;
  width?: number;
  height?: number;
  usable?: boolean;
}

export interface TwitterShareProps {
  url?: string;
  text?: string;
  hashtags?: string;
  width?: number;
  height?: number;
  usable?: boolean;
}

export interface BandShareProps {
  url?: string;
  message?: string;
  width?: number;
  height?: number;
  usable?: boolean;
}

export interface EmailShareProps {
  addressee?: string;
  subject?: string;
  body?: string;
  usable?: boolean;
}

export interface FacebookShareProps {
  url?: string;
  width?: number;
  height?: number;
  usable?: boolean;
}

export interface SnsShareContentProps {
  isSnsShareHeader: boolean; // header 영역 클릭했는지 판단 여부
	initial: {
		height: number
	},
  pointerType: {
    type: 'none' | 'touch' | 'mouse'; // type 구분
  };
  touchStart: {
    snsShareContentHeight: number; // sns 공유 영역 높이값
    touchY: number; // 터치한 곳의 Y값
    timeStamp: number; // 타임스탬프
  };
  touchMove: {
    prevTouchY?: number; // 움직이는 동안의 Y값
    movingDirection: 'none' | 'down' | 'up'; // 움직이는 방향
    timeStamp: number; // 타임스탬프
  };
  mouseDown: {
    snsShareContentHeight: number; // sns 공유 영역 높이값
    touchY: number; // 터치한 곳의 Y값
    timeStamp: number; // 타임스탬프
  };
  mouseMove: {
    prevTouchY?: number; // 움직이는 동안의 Y값
    movingDirection: 'none' | 'down' | 'up'; // 움직이는 방향
    timeStamp: number; // 타임스탬프
  };
}
