import React from 'react';
import { useReactiveVar } from '@apollo/client';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import styled, { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';
import GlobalStyles from '../Styles/GlobalStyles';

import Theme from '../Styles/Theme';
import Routes from './Router';
import Footer from './Footer';
import Header from './Header';
import { isLogginVar } from '../Apollo/LocalState';

function App() {
  const isLoggedIn = useReactiveVar(isLogginVar);
  const Wrapper = styled.div`
    margin: 0 auto;
    max-width: ${(props) => props.theme.maxWidth};
    width: 100%;
  `;
  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Router>
          <Wrapper>
            <Header isLoggedIn={isLoggedIn} />
            <Routes isLoggedIn={isLoggedIn} />
            <Footer />
          </Wrapper>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </ThemeProvider>
    </>
  );
}

export default App;
