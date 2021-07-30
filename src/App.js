import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import Main from './components/Main/Main';

function App() {
  return (
    <>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <div className="App">
          <Main />
        </div>
      </SnackbarProvider>
    </>
  );
}

export default App;
