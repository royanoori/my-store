'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store, RootState, AppDispatch } from '../store/store';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../theme';
import { setMode } from '../store/slices/themeSlice';
import Loading from '../components/Loading';

interface ProvidersProps {
  children: ReactNode;
}

function ThemeWrapper({ children }: { children: ReactNode }) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch: AppDispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // فقط روی کلاینت اجرا میشه
    const savedMode = (localStorage.getItem('themeMode') as 'light' | 'dark') || 'light';
    dispatch(setMode(savedMode));
    setMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (mode === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [mode]);

  if (!mounted) {
    return <Loading />; // هیچ UI نده تا کلاینت آماده بشه
  }

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default function AppProviders({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </Provider>
  );
}
