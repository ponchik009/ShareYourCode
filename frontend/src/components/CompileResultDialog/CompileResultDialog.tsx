import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Button,
} from "@mui/material";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  stdout: string;
  stderr: string;
}

const CompileResultDialog: React.FC<IProps> = ({
  isOpen,
  onClose,
  stdout,
  stderr,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Typography>Результат выполнения программы</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Стандартный поток вывода"
          fullWidth
          disabled
          multiline
          value={stdout}
          sx={{ marginTop: "10px" }}
        />
        <TextField
          label="Стандартный поток ошибок"
          fullWidth
          multiline
          disabled
          value={stderr}
          sx={{ marginTop: "10px" }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CompileResultDialog;
