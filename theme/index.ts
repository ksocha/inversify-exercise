import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const overrides = {
  styles: {
    global: {
      'html, body': {
        bgColor: 'gray.100',
        color: 'gray.700',
      },
    },
  },
};

export default extendTheme(
  withDefaultColorScheme({
    colorScheme: 'teal',
  }),
  overrides,
);
