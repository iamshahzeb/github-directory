// Components
import Header from '@/components/header';

// Packages
import { ReactNode } from 'react';

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
