import React from "react";
import { Typography } from "@mui/material";
import "../Page.scss";

const ErrorPage = () => {
  return (
    <div className="custom-page">
      <Typography sx={{ fontSize: 40, color: "#1E1E1E" }}>
        Ошибка 404.
      </Typography>
      <Typography>
        Если вы что-то искали, то здесь вы этого не найдёте
      </Typography>
    </div>
  );
};

export default ErrorPage;
