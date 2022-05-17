import React from "react";
import { Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface ITipProps {
  hint: string;
}

const Tip: React.FC<ITipProps> = ({ hint }) => {
  return (
    <Tooltip title={hint}>
      <HelpOutlineIcon />
    </Tooltip>
  );
};

export default Tip;
