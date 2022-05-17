import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface ISnack {
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

const Snack: React.FC<ISnack> = ({ text, isOpen, onClose }) => {
  return (
    <Snackbar open={isOpen} onClose={onClose}>
      <Alert severity="error" sx={{ width: "100%" }} onClose={onClose}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
