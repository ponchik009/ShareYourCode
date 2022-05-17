import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import GroupsList from "./GroupsList/GroupsList";
import CircularProgress from "@mui/material/CircularProgress";

import "../../Page.scss";
import { IGroupItem } from "../../../interfaces/entities";
import { GroupTypes } from "../../../api/group";
import { api } from "../../../api";
import { useSearchParams } from "react-router-dom";

const GroupsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = React.useState(
    searchParams.get("tab") || GroupTypes.PUBLIC
  );
  const [groups, setGroups] = React.useState<IGroupItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setTab(newValue);
    setSearchParams({ tab: newValue });
  };

  React.useEffect(() => {
    /*
      запрос на группы
    */
    setIsLoading(true);
    api.group
      .getGroups(tab)
      .then((groups) => {
        setGroups(groups);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [tab]);

  return (
    <div className="page">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs">
          <Tab
            label="Публичные сообщества"
            value={GroupTypes.PUBLIC}
            style={{ fontSize: "4vh", minWidth: "20vw" }}
          />
          <Tab
            label="Мои сообщества"
            value={GroupTypes.MY}
            style={{ fontSize: "4vh", minWidth: "20vw" }}
          />
        </Tabs>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <GroupsList groups={groups} />
        </Box>
      )}
    </div>
  );
};

export default GroupsPage;
