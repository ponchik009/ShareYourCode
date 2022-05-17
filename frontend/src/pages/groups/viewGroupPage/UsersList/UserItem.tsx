import React from "react";
import { Typography, Divider, ListItem, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GradeIcon from "@mui/icons-material/Grade";
import { IUserItem } from "../../../../interfaces/entities";
import StyledIconButton from "../../../../components/UI/StyledIconButton";

interface IProps {
  user: IUserItem;
  onDelegateAdmin: () => void;
  onKickOut: () => void;
}

const UserItem: React.FC<IProps> = ({ user, onDelegateAdmin, onKickOut }) => {
  return (
    <>
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ overflowX: "hidden" }}>{user.name}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <StyledIconButton onClick={onDelegateAdmin}>
            <GradeIcon />
          </StyledIconButton>
          <StyledIconButton onClick={onKickOut}>
            <CloseIcon />
          </StyledIconButton>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default UserItem;
