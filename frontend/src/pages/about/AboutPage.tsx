import { Typography } from "@mui/material";
import React from "react";
import "../Page.scss";

const AboutPage = () => {
  return (
    <div className="custom-page">
      <Typography>
        Данный проект - результат больной фантазии студента Иркутского
        политехнического института.
      </Typography>
      <Typography>
        Если вы хотите поддержать разработчика, то лучше не надо. Он не
        заслужил.
      </Typography>
    </div>
  );
};

export default AboutPage;
