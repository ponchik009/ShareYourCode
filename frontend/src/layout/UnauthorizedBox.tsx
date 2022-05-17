import React from "react";
import { Box, Button, Divider } from "@mui/material";
import StyledIconButton from "../components/UI/StyledIconButton";

interface IProps {
  handleSignIn: () => void;
  handleSignUp: () => void;
}

const UnauthorizedBox: React.FC<IProps> = ({ handleSignIn, handleSignUp }) => {
  return (
    <Box className="userBox">
      <StyledIconButton onClick={handleSignIn}>
        {/* <AccountCircleIcon sx={{ fontSize: "112px" }} /> */}
        <img src="/img/hacker 2.svg" alt="кнопка входа в аккаунт" />
      </StyledIconButton>
      <Box style={{ display: "flex" }}>
        <Button
          variant="text"
          style={{
            fontSize: 16,
            color: "#DCDCAA",
          }}
          onClick={handleSignIn}
        >
          Sign in
        </Button>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ backgroundColor: "#DCDCAA" }}
        />
        <Button
          variant="text"
          style={{
            fontSize: 16,
            color: "#DCDCAA",
          }}
          onClick={handleSignUp}
        >
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default UnauthorizedBox;
