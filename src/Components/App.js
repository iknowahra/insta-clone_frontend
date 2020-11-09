import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';

function App() {
  return (
    <>
      <ThemeProvider theme={Theme} />
      <GlobalStyles />
      hello
    </>
  );
}

export default App;
