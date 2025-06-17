import React from 'react';
import { ThemeProvider } from '@mui/material/styles'
import theme from './index';

// eslint-disable-next-line react/prop-types
export const AppThemeProvider = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
