import React from "react";
import {
  Switch,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../api";
import { ITredCreate } from "../../../interfaces/entities";
import Snack from "../../../components/Snack/Snack";
import Tip from "../../../components/tooltip/Tip";

const CreateTredPage = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [maxPackages, setMaxPackages] = React.useState(10);
  const [closeDate, setCloseDate] = React.useState(
    new Date(Date.now() + 1000 * 3600 * 24 * 3).toISOString().split("T")[0]
  );
  const [isPublic, setIsPublic] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const navigate = useNavigate();
  const { groupId } = useParams();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handlePackagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPackages(+event.target.value);
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);

    setCloseDate(event.target.value);
  };
  const handleIsPublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  const handleCreateClick = () => {
    setIsLoading(true);
    // отправка запроса на создание треда
    const tred = {
      name,
      description,
      closeDate: new Date(closeDate),
      maxPackages,
      isPublic,
      groupId: +groupId!,
    } as ITredCreate;
    api.tred
      .create(tred)
      .then((tred) => navigate(`/groups/${groupId}`))
      .catch((err) => setError(err.response.data.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="page">
      <Typography>{`Создание треда в группе с id = ${groupId}`}</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <TextField
              label="Название"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
            <TextField
              label="Описание"
              rows={8}
              multiline
              fullWidth
              value={description}
              onChange={handleDescriptionChange}
              sx={{ marginTop: "10px" }}
            />
            <TextField
              label="Максимум посылок от участника"
              type="number"
              fullWidth
              value={maxPackages}
              onChange={handlePackagesChange}
              sx={{ marginTop: "10px" }}
            />
            <Typography
              sx={{ marginTop: "10px", display: "flex", alignItems: "center" }}
            >
              Дата закрытия треда:
              <Tip hint="Дата, после которой посылки нельзя будет отправить" />
            </Typography>
            <TextField
              type="date"
              value={closeDate}
              onChange={handleDateChange}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ marginTop: "10px" }}>Публичный: </Typography>
              <Switch value={isPublic} onChange={handleIsPublicChange} />
              <Tip hint="Если тред публичный, участники могут просматривать посылки друг друга" />
            </Box>
          </Box>
          <Button variant="contained" onClick={handleCreateClick}>
            Создать
          </Button>
        </>
      )}
      <Snack
        isOpen={error.length > 0}
        onClose={() => setError("")}
        text={error}
      />
    </div>
  );
};

export default CreateTredPage;
