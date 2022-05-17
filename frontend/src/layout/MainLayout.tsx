import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import Divider from "@mui/material/Divider";

import DrawerHeader from "../components/UI/DrawerHeader";
import StyledIconButton from "../components/UI/StyledIconButton";
import StyledDrawer from "../components/UI/StyledDrawer";

import "./MainLayout.scss";
import UnauthorizedBox from "./UnauthorizedBox";
import NavigationList from "./NavigationList";
import AuthDialog from "../components/AuthDialog/AuthDialog";
import { useDispatch } from "react-redux";
import { getUser, logIn, logOut } from "../store/action/auth";
import UserBox from "./UserBox";

import { api } from "../api/index";

import { AppBar, Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface ILayoutProps {
  isAuth: boolean | null;
}

const MainLayout: React.FC<ILayoutProps> = ({ children, isAuth }) => {
  const dispatch = useDispatch();

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isLoginDialog, setIsLoginDialog] = React.useState(true);

  // открытие шторки
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  // открытие модалки логина
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // переключение табов модалки
  const handleSignIn = () => {
    handleDialogOpen();
    setIsLoginDialog(true);
  };
  const handleSignUp = () => {
    handleDialogOpen();
    setIsLoginDialog(false);
  };

  // авторизация и выход с аккаута
  const signIn = (email: string, password: string) => {
    return logIn(email, password)(dispatch).then((error) => error);
  };
  const signOut = () => {
    logOut()(dispatch);
  };
  const signUp = async (
    email: string,
    password: string,
    name: string
  ): Promise<void | any> => {
    try {
      await api.auth.register(email, password, name);
      logIn(email, password)(dispatch).then((error) => error);
    } catch (err: any) {
      console.log(err.message);
      throw new Error(err.message);
    }
  };

  React.useEffect(() => {
    getUser()(dispatch);
    // @ts-ignore
    window.handleSignIn = handleSignIn;
    // @ts-ignore
    window.handleSignUp = handleSignUp;
  }, []);

  if (isAuth === null) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1E1E1E" }}>
        <StyledIconButton
          sx={{
            marginLeft: "64px",
            zIndex: "1000",
            width: "56px",
            height: "56px",
          }}
        >
          <MenuIcon onClick={handleDrawerOpen} sx={{ fontSize: "56px" }} />
        </StyledIconButton>
      </AppBar>
      <StyledDrawer
        variant="persistent"
        anchor="left"
        open={openDrawer}
        className="drawer"
        onClose={handleDrawerClose}
      >
        <DrawerHeader>
          <StyledIconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </StyledIconButton>
        </DrawerHeader>
        <Divider sx={{ bgcolor: "#fff" }} />
        {isAuth ? (
          <UserBox signOut={signOut} />
        ) : (
          <UnauthorizedBox
            handleSignIn={handleSignIn}
            handleSignUp={handleSignUp}
          />
        )}
        <Divider sx={{ bgcolor: "#fff" }} />
        <NavigationList />
        <Divider sx={{ bgcolor: "#fff" }} />
      </StyledDrawer>
      <AuthDialog
        isOpen={openDialog}
        onClose={handleDialogClose}
        isLogin={isLoginDialog}
        signIn={signIn}
        signUp={signUp}
      />

      <div className="wrapper">{children}</div>
    </>
  );
};

export default MainLayout;
