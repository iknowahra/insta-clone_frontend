import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import Router from './Router';
import { isLogginVar } from '../Apollo/LocalState';
import Footer from './Footer';

function App() {
  const isLoggedIn = useReactiveVar(isLogginVar);
  const Wrapper = styled.div`
    margin: 0 auto;
    max-width: 935px;
    width: 100%;
  `;
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Wrapper>
          <GlobalStyles />
          <Router isLoggedIn={isLoggedIn} />
          <Footer />
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
