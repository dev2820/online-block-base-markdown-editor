import { lightDefaultTheme } from '@blocknote/react';

export const lightTheme = {
  colors: {
    editor: {
      text: '#222222',
      background: '#f5f5f4',
    },
    menu: {
      text: '#222222',
      background: '#f5f5f4',
    },
    tooltip: {
      text: '#222222',
      background: '#f5f5f4',
    },
    hovered: {
      text: '#222222',
      background: '#e7e5e4',
    },
    selected: {
      text: '#222222',
      background: '#e7e5e4',
    },
    disabled: {
      text: '#991b1b',
      background: '#fecaca',
    },
    shadow: '#f3f4f6',
    border: '#d1d5db',
    sideMenu: '#a8a29e',
    highlights: lightDefaultTheme.colors.highlights,
  },
  borderRadius: 8,
  fontFamily: 'Helvetica Neue, sans-serif',
};

export const darkTheme = {
  ...lightTheme,
};
