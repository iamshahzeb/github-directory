// Components
import ErrorBoundary from '@/components/error-boundary';

// Services
import { createEmotionCache, theme } from '@/services/material';
import { reactQueryUtilService } from '@/services/react-query';
import '@/services/translations';

// Packages
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

// Styles
import '../styles/globals.css';

// Initialize react query client
const queryClient = new QueryClient(reactQueryUtilService.queryDefaultConfig);

// Material related custom styles config
const clientSideEmotionCache = createEmotionCache();

interface MyAppPropsI extends AppProps {
 emotionCache: any;
}

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppPropsI) => {
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
    <CacheProvider value={emotionCache}>
     <ThemeProvider theme={theme}>
      <Component {...pageProps} />
     </ThemeProvider>
    </CacheProvider>
    <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  </ErrorBoundary>
 );
};

export default MyApp;
