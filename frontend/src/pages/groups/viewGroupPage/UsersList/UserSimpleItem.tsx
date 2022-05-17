import { Divider, Typography } from "@mui/material";
import React from "react";
import { IUserItem } from "../../../../interfaces/entities";

interface IUserSimpleProps {
  user: IUserItem;
  admin: boolean;
}

const UserSimpleItem: React.FC<IUserSimpleProps> = ({ user, admin }) => {
  return (
    <>
      <Typography>{user.name + (admin ? " (админ)" : "")}</Typography>
      <Divider />
    </>
  );
};

export default UserSimpleItem;
