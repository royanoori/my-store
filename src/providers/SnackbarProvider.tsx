'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

// نوع context و hook
type SnackbarContextType = {
  showMessage: (message: string, severity?: "error" | "success" | "info" | "warning") => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar باید داخل SnackbarProvider استفاده شود");
  return ctx;
};

// متغیر global برای دسترسی queryClient
export let globalShowSnackbar: (msg: string, severity?: "error" | "success" | "info" | "warning") => void;

export const setGlobalShowSnackbar = (fn: typeof globalShowSnackbar) => {
  globalShowSnackbar = fn;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"error" | "success" | "info" | "warning">("info");

  const showMessage = (msg: string, sev: "error" | "success" | "info" | "warning" = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  // اتصال global showSnackbar به hook داخل Provider
  setGlobalShowSnackbar(showMessage);

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpen(false)} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
