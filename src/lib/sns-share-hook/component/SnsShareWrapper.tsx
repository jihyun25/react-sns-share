import {useSnsShareDrawer} from '../useSnsShareDrawer';

type SnsShareWrapperProps = {
  children: React.ReactNode;
};

export const SnsShareWrapper = ({children}: SnsShareWrapperProps) => {
  const {isOpen} = useSnsShareDrawer();

  return (
    <div className={`sns__share__wrapper ${isOpen ? 'drawer-open' : ''}`}>
      {children}
    </div>
  );
};
