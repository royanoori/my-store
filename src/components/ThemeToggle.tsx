'use client';

import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMode } from '../store/slices/themeSlice';
import { RootState, AppDispatch } from '../store/store';

export default function ThemeToggle() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch: AppDispatch = useDispatch();

  return (
    <Button variant="contained" onClick={() => dispatch(toggleMode())}>
      Switch to {mode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}
