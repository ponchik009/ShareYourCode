import { Typography, Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../api";
import { useAppSelector } from "../../../hooks/hooks";
import { ITred } from "../../../interfaces/entities";
import PackagesList from "./PackagesList/PackagesList";

const ViewTredPage = () => {
  const { tredId } = useParams();
  const [tred, setTred] = React.useState<ITred | null>(null);
  const navigate = useNavigate();

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { user } = useAppSelector((state) => state.auth); // на будущее, для менеджмента тредом

  const handleCreatePackage = () => {
    navigate(`/groups/${tred?.group.id}/treds/${tred?.id}/packages/create`);
  };

  React.useEffect(() => {
    setIsLoading(true);
    // запрос на получение треда
    api.tred
      .get(+tredId!)
      .then(setTred)
      .catch((err) => setError(err.response.data.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="page">
      {isLoading ? (
        <CircularProgress />
      ) : tred ? (
        <>
          <Typography>{`Tred with ID = ${tredId}\n${tred.name}`}</Typography>
          <Box sx={{ marginTop: "20px" }}>
            <PackagesList
              packages={tred.packages}
              groupId={tred.group.id!}
              tredId={tred.id}
            />
            <Button onClick={handleCreatePackage}>Создать посылку</Button>
          </Box>
        </>
      ) : (
        <Typography>{error}</Typography>
      )}
    </div>
  );
};

export default ViewTredPage;
