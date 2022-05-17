import React from "react";
import {
  ListItemButton,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
} from "@mui/material";
import { ITred, ITredItem } from "../../../../interfaces/entities";

interface IProps {
  tred: ITredItem;
  onClick: () => void;
}

const TredItem: React.FC<IProps> = ({ tred, onClick }) => {
  return (
    <>
      <Accordion sx={{ backgroundColor: "#D1C16D" }}>
        <AccordionSummary>
          <Typography variant="h6">{tred.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>Описание: {tred.description}</AccordionDetails>
        <AccordionActions>
          <Button onClick={onClick}>Перейти в тред</Button>
        </AccordionActions>
      </Accordion>
      {/* <ListItemButton onClick={onClick}>
        <Typography>{tred.name}</Typography>
      </ListItemButton> */}
      <Divider />
    </>
  );
};

export default TredItem;
