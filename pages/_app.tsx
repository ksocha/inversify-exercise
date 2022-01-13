import 'reflect-metadata';
import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
// import { Provider as InversifyProvider } from 'inversify-react';

// import container from 'inversify.config';
import theme from 'theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // <InversifyProvider container={container}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    // </InversifyProvider>
  );
}

export default MyApp;
