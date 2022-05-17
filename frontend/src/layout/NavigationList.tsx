import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import NAVIGATION_LIST from "../const/navigation";

const NavigationList = () => {
  const navigate = useNavigate();
  // console.log(navigate);

  return (
    <List>
      {NAVIGATION_LIST.map((nav, index) => (
        <ListItem button key={nav.name} onClick={() => navigate(`${nav.link}`)}>
          <Typography
            style={{
              fontFamily: "Courier Prime",
              fontSize: 20,
              color: "#858585",
            }}
          >
            {index + 1}&nbsp;
          </Typography>
          <Typography style={{ fontFamily: "Courier Prime", fontSize: 20 }}>
            {nav.name}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default NavigationList;
