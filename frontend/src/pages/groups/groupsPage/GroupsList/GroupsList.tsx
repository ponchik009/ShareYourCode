import React from "react";
import { List, Typography } from "@mui/material";
import GroupItem from "./GroupItem";
import { useNavigate } from "react-router-dom";
import { IGroupItem } from "../../../../interfaces/entities";

interface IProps {
  groups: IGroupItem[];
}

const GroupsList: React.FC<IProps> = ({ groups }) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/groups/${id}`);
  };

  return (
    <List>
      {groups.length > 0 ? (
        groups.map((group: IGroupItem) => (
          <GroupItem
            group={group}
            onClick={() => handleClick(group.id)}
            key={group.id}
          />
        ))
      ) : (
        <Typography>Групп не найдено!</Typography>
      )}
    </List>
  );
};

export default GroupsList;
