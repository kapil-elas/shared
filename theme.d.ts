// app/src/theme.d.ts
import 'styled-components';
import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    functions: {
      boxShadow: (size: string[]) => string;
      pxToRem: (px: number, base?: number) => string;
    };
  }

  interface ThemeOptions {
    functions?: {
      boxShadow?: (size: string[]) => string;
      pxToRem?: (px: number, base?: number) => string;
    };
  }
}
