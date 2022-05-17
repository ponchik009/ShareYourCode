import { Backdrop, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { api } from "../../../api";
import { IGroup } from "../../../interfaces/entities";
import "../../Page.scss";

const EnterGroupPage = () => {
  const { inviteLink } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [group, setGroup] = React.useState<IGroup | null>(null);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setIsLoading(true);
    api.group
      .enterFromLink(inviteLink!)
      .then(setGroup)
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      ) : !group ? (
        <div className="custom-page">
          <Typography> {error}</Typography>
        </div>
      ) : (
        <Navigate to={`/groups/${group.id}`} />
      )}
    </>
  );
};

export default EnterGroupPage;
