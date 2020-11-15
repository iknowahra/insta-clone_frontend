import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import Router from './Router';
import { isLogginVar } from '../Apollo/LocalState';

function App() {
  const isLoggedIn = useReactiveVar(isLogginVar);

  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Router isLoggedIn={isLoggedIn} />
      </ThemeProvider>
    </>
  );
}

export default App;
