import React from "react";
import { IUser, IUserItem } from "../../../../interfaces/entities";
import { Box, Button, List, Typography, Divider } from "@mui/material";
import UserItem from "./UserItem";
import UserSimpleItem from "./UserSimpleItem";

interface IProps {
  members: IUserItem[];
  groupId: number;
  user: IUser;
  adminId: number;
  kickOut: (user: IUserItem) => void;
  delegateAdmin: (user: IUserItem) => void;
}

const UsersList: React.FC<IProps> = ({
  members,
  user,
  kickOut,
  delegateAdmin,
  adminId,
}) => {
  const handleDelegateAdmin = (user: IUserItem) => {
    const answer = window.confirm(
      "Вы точно хотите передать админские права этому челу?"
    );
    // типа передаем или нет
    if (answer) delegateAdmin(user);
  };

  const handleKickOut = (user: IUserItem) => {
    const answer = window.confirm("Вы точно хотите кикнуть этого чела?");
    // типа передаем или нет
    if (answer) kickOut(user);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">Участники сообщества</Typography>
      <List>
        {members.map((member) =>
          user.id === member.id ? (
            <>
              <Typography key={user.id} sx={{ color: "green" }}>
                {user.name + (adminId === user.id ? " (админ + я)" : " (я)")}
              </Typography>
              <Divider />
            </>
          ) : adminId === user.id ? (
            <UserItem
              user={member}
              onDelegateAdmin={() => handleDelegateAdmin(member)}
              onKickOut={() => handleKickOut(member)}
              key={member.id}
            />
          ) : (
            <UserSimpleItem
              user={member}
              key={member.id}
              admin={adminId === member.id}
            />
          )
        )}
      </List>
    </Box>
  );
};

export default UsersList;
