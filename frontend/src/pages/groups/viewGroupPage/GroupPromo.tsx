import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { IGroup } from "../../../interfaces/entities";

interface IGroupPromoProps {
  handleEnter: () => void;
  group: IGroup;
}

const GroupPromo: React.FC<IGroupPromoProps> = ({ handleEnter, group }) => {
  console.log(group);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">Просмотр информации о группе</Typography>
        <Typography>Название группы: {group.name}</Typography>
        <Typography>Описание: {group.description}</Typography>
        <Typography>Количество участников: {group.members.length}</Typography>
        <Typography>Количество тредов: {group.treds.length}</Typography>
        <Box sx={{ margin: "auto" }}>
          <Button onClick={handleEnter}>Вступить</Button>
        </Box>
      </Box>
    </>
  );
};

export default GroupPromo;
