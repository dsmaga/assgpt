import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InputComponent from './components/InputComponent';
import HistoryComponent from './components/HistoryComponent';
import { ConfigProvider } from './hooks/Config';
import { HistoryProvider } from './hooks/History';
import ConfigComponent from './components/ConfigComponent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { OpenAiProvider } from './hooks/OpenAi';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ConfigProvider>
        <HistoryProvider>
          <OpenAiProvider>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
              }}
            >
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                }}
              >
                <HistoryComponent />
              </div>
              <InputComponent openConfig={() => setOpen(true)} />
            </div>
            <Dialog onClose={handleClose} open={open}>
              <DialogTitle>Configuration</DialogTitle>
              <ConfigComponent closeConfig={handleClose} />
            </Dialog>
          </OpenAiProvider>
        </HistoryProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
