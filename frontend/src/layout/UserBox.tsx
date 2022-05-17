import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useAppSelector } from "../hooks/hooks";

interface IUserBoxProps {
  signOut: () => void;
}

const UserBox: React.FC<IUserBoxProps> = ({ signOut }) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Box className="userBox">
      <img
        src="/img/robot.svg"
        alt="иконка юзера"
        style={{ color: "#DCDCAA" }}
      />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontSize: 16,
            color: "#DCDCAA",
            paddingRight: 5,
          }}
        >
          {user ? user.name : "пожилой диплодок"}
        </Typography>
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
          onClick={signOut}
        >
          Sign out
        </Button>
      </Box>
    </Box>
  );
};

export default UserBox;
