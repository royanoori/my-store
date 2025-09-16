"use client";

import { Button, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../store/slices/themeSlice";
import { RootState, AppDispatch } from "../store/store";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
export default function ThemeToggle() {
 const mode = useSelector((state: RootState) => state.theme.mode);
 const dispatch: AppDispatch = useDispatch();

 return (
  <IconButton
   aria-label="Mode"
   size="small"
   onClick={() => dispatch(toggleMode())}
  >
   {mode === "light" ? (
    <DarkModeIcon className="text-sky-50" />
   ) : (
    <LightModeIcon className="text-yellow-600" />
   )}
  </IconButton>
 );
}
