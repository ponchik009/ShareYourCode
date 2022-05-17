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
  inviteError: string;
  invite: (email: string) => void;
  generate: () => void;
  inviteLink: string;
  inviteLinkError: string;
}

const InviteDialog: React.FC<IProps> = ({
  isOpen,
  onClose,
  invite,
  generate,
  inviteLink,
  inviteError,
  inviteLinkError,
}) => {
  const [email, setEmail] = React.useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleInvite = () => {
    // берем email и отправляем инвайт
    invite(email);
  };
  const handleGenerate = () => {
    // отправляем запрос на генерацию ссылки
    generate();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Typography>Приглашение в сообщество</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>Приглашение по email</Typography>
        <TextField
          label="Email"
          fullWidth
          value={email}
          error={inviteError.length > 0}
          helperText={inviteError}
          onChange={handleEmailChange}
        />
        <Button onClick={handleInvite}>Добавить</Button>
        <Typography>Генерация ссылки</Typography>
        <TextField
          label="Link"
          fullWidth
          multiline
          value={
            inviteLink
              ? `${
                  process.env.REACT_APP_URL || "http://localhost:9000"
                }/groups/enter/${inviteLink}`
              : ""
          }
          error={inviteLinkError.length > 0}
          helperText={inviteLinkError}
          sx={{ cursor: "text" }}
        />
        <Button onClick={handleGenerate}>Сгенерировать</Button>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
