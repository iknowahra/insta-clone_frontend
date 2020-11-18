import React from 'react';
import { useReactiveVar } from '@apollo/client';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Styles/GlobalStyles';

import Theme from '../Styles/Theme';
import Router from './Router';
import Footer from './Footer';
import { isLogginVar } from '../Apollo/LocalState';

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
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
