// Components
import ErrorBoundary from '@/components/error-boundary';

// Services
import { reactQueryUtilService } from '@/services/react-query';
import '@/services/translations';

// Packages
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

// Styles
import '../styles/globals.css';

// Initialize react query client
const queryClient = new QueryClient(reactQueryUtilService.queryDefaultConfig);

const MyApp = ({ Component, pageProps }: AppProps) => {
 /**
  * @Render
  */
 return (
  <ErrorBoundary>
   <QueryClientProvider client={queryClient}>
    <ToastContainer
     position="top-right"
     autoClose={3000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
    />
    <Component {...pageProps} />
    <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  </ErrorBoundary>
 );
};

export default MyApp;
