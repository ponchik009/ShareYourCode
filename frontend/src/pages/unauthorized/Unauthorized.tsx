import React from "react";
import { Typography } from "@mui/material";
import "../Page.scss";

const Unauthorized = () => {
  return (
    <div className="custom-page">
      <Typography sx={{ fontSize: 40, color: "#1E1E1E" }}>
        Ошибка 401.
      </Typography>
      <Typography>Доступ неавторизованным пользователям запрещен</Typography>
    </div>
  );
};

export default Unauthorized;
