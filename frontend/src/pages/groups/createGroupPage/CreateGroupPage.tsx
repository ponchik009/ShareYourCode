import { Box, Button, Switch, TextField, Typography } from "@mui/material";
import React, { ChangeEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";
import Tip from "../../../components/tooltip/Tip";

import "../../Page.scss";

const CreateGroupPage = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(false);
  const navigate = useNavigate();

  const [error, setError] = React.useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleIsPublicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  const handleCreateClick = async () => {
    // отправка запроса на создание
    try {
      const groupId = await api.group.create(name, description, isPublic);
      // редирект на страницу группы
      navigate(`/groups/${groupId}`);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="page">
      <Typography>Создание сообщества</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          minWidth: "50vw",
          maxWidth: "80vw",
        }}
      >
        {error && <Typography>{error}</Typography>}
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
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography sx={{ marginTop: "10px" }}>Публичное: </Typography>
          <Switch value={isPublic} onChange={handleIsPublicChange} />
          <Tip hint="Публичные сообщества отображаются в списке сообществ, в них может вступить любой желающий" />
        </Box>
      </Box>
      <Button variant="contained" onClick={handleCreateClick}>
        Создать
      </Button>
    </div>
  );
};

export default CreateGroupPage;
