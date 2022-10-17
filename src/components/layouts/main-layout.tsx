// Components
import { ReactNode } from 'react';

// Packages
import Header from '@/components/header';

const MainLayout = ({ children }: { children: ReactNode }) => {
 /**
  * @Render
  */
 return (
  <>
   <Header />
   {children}
  </>
 );
};

export default MainLayout;
