import React from 'react';
import { AppThemeProvider } from './../assets/theme/AppThemeProvider';

const withTheme = (Component) => (props) => {
  return (
    <AppThemeProvider>
      <Component {...props} />
    </AppThemeProvider>
  );
};

export default withTheme;
