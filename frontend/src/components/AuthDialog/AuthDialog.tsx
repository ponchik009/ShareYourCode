import { Dialog, DialogTitle, Box, Tabs, Tab } from "@mui/material";
import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
  signIn: (email: string, password: string) => Promise<string | undefined>;
  signUp: (
    email: string,
    password: string,
    name: string
  ) => Promise<void | any>;
}

const AuthDialog: React.FC<IProps> = ({
  isOpen,
  onClose,
  isLogin,
  signIn,
  signUp,
}) => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  React.useEffect(() => {
    setTab(isLogin ? 0 : 1);
  }, [isLogin]);

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs value={tab} onChange={handleChange} aria-label="basic tabs">
            <Tab label="Вход" />
            <Tab label="Регистрация" />
          </Tabs>
        </Box>
      </DialogTitle>
      {tab === 0 ? (
        <LoginForm signIn={signIn} onClose={onClose} />
      ) : (
        <RegisterForm signUp={signUp} onClose={onClose} />
      )}
    </Dialog>
  );
};

export default AuthDialog;
