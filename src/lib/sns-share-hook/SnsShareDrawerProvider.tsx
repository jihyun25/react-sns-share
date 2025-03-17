import { ReactNode, useState } from "react";
import { SnsShareDrawerContext } from "./SnsShareDrawerContext";
import { SnsShareDataType, SnsShareDefaultDataType } from "./types";
import { SnsShareWrapper } from "./component/SnsShareWrapper";
import { SnsShareBackDrop } from "./component/SnsShareBackDrop";
import { SnsShareContent } from "./component/SnsShareContent";
import "./style/SnsShareContent.css";
import "./style/SnsShareBg.css";
import "./style/UserCustom.css";

export interface SnsShareDrawerProviderProps {
  children: ReactNode;
  defaultData?: SnsShareDefaultDataType;
}

// DrawerProvider는 자식 컴포넌트들에게 Drawer 상태와 상태 변경 함수를 제공
export const SnsShareDrawerProvider = ({
  children,
  defaultData,
}: SnsShareDrawerProviderProps) => {
  const defaultSnsShareData = defaultData ?? null;

  const defaultWidth = 600;
  const defaultHeight = 600;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [drawerBg, setDrawerBg] = useState<boolean>(true);
  const [snsShareData, setSnsShareData] = useState<SnsShareDataType | null>(
    null
  );

  return (
    <SnsShareDrawerContext.Provider
      value={{
        isOpen,
        setIsOpen,
        drawerBg,
        setDrawerBg,
        snsShareData,
        setSnsShareData,
        defaultSnsShareData,
        defaultWidth,
        defaultHeight,
      }}
    >
      <>
        {children}
        <SnsShareWrapper>
          <SnsShareBackDrop />
          <SnsShareContent />
        </SnsShareWrapper>
      </>
    </SnsShareDrawerContext.Provider>
  );
};
