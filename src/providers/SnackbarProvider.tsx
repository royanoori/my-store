"use client";

import React, { createContext, useContext,useState, ReactNode, useEffect,} from "react";
import { Snackbar, Alert, IconButton, SnackbarCloseReason,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type SnackbarContextType = {
 showMessage: (
  message: string,
  severity?: "error" | "success" | "info" | "warning"
 ) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
 undefined
);

export const useSnackbar = () => {
 const ctx = useContext(SnackbarContext);
 if (!ctx)
  throw new Error("useSnackbar باید داخل SnackbarProvider استفاده شود");
 return ctx;
};

export let globalShowSnackbar: SnackbarContextType["showMessage"] | null = null;

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
 const [open, setOpen] = useState(false);
 const [message, setMessage] = useState("");
 const [severity, setSeverity] = useState<
  "error" | "success" | "info" | "warning"
 >("info");

 const showMessage = (
  msg: string,
  sev: "error" | "success" | "info" | "warning" = "info"
 ) => {
  setMessage(msg);
  setSeverity(sev);
  setOpen(true);
 };

 useEffect(() => {
  globalShowSnackbar = showMessage;
 }, []);
 useEffect(() => {
  console.log("Snackbar open:", open);
 }, [open]);
 const handleClose = (
  _event?: React.SyntheticEvent | Event,
  reason?: SnackbarCloseReason
 ) => {
  console.log(open);
  if (reason === "clickaway") return;
  setOpen(false);
 };

 return (
  <SnackbarContext.Provider value={{ showMessage }}>
   {children}

   <Snackbar
    open={open}
    autoHideDuration={60000}
    onClose={handleClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
   >
    <Alert
     severity={severity}
     variant="filled"
     sx={{
      fontFamily: "Vazirmatn, Arial, sans-serif",
      fontSize: "0.8rem",
      textAlign: "right",
      direction: "rtl",
     }}
     action={
      <IconButton
       size="small"
       aria-label="close"
       color="inherit"
       onClick={handleClose}
      >
       <CloseIcon fontSize="small" />
      </IconButton>
     }
    >
     {message}
    </Alert>
   </Snackbar>
  </SnackbarContext.Provider>
 );
};
