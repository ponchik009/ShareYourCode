import React from "react";
import { Button, List, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TredItem from "./TredItem";
import { ITred, ITredItem } from "../../../../interfaces/entities";

interface IProps {
  treds: ITredItem[];
  groupId: number;
}

const TredsList: React.FC<IProps> = ({ treds, groupId }) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/groups/${groupId}/treds/${id}`);
  };
  const handleCreateTred = () => {
    navigate(`/groups/${groupId}/treds/create`);
  };

  return (
    <List>
      {treds.length > 0 ? (
        treds.map((tred) => (
          <TredItem
            tred={tred}
            onClick={() => handleClick(tred.id)}
            key={tred.id}
          />
        ))
      ) : (
        <>
          <Typography>В этой группе пока нет тредов</Typography>
        </>
      )}
    </List>
  );
};

export default TredsList;
