import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";
import "./MainPage.scss";

interface IMainPageProps {
  isAuth: null | boolean;
}

const MainPage: React.FC<IMainPageProps> = ({ isAuth }) => {
  return (
    <div className="page">
      <Box sx={{ maxWidth: "80vw" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{ fontSize: 48, color: "#EBEBCE", fontWeight: "bold" }}
            >
              Share Your Code
            </Typography>
            <Typography style={{ fontSize: 32, color: "#EBEBCE" }}>
              Платформа для программистов
            </Typography>
            <Typography style={{ fontSize: 32, color: "#EBEBCE" }}>
              Делитесь кодом и оценивайте его!
            </Typography>
          </Box>
          <img src="/img/logo.svg" alt="логотип" className="logo" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ paddingX: "1vw", maxWidth: "40vw" }}>
            <Typography sx={{ textAlign: "left" }}>
              Share your code - это платформа, на которой программисты могут
              объединяться в сообщества и решать тематические задачи, а также
              оценивать решения других.
            </Typography>
            <Typography sx={{ textAlign: "left" }}>
              В рамках вуза, сообщества могут соответствовать учебным группам.
              Треды могут соответствовать лабораторным работам. Соответственно,
              посылки - решения (код), отправленное по данной лабораторной
              работе.
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <List>
              <ListItem
                sx={{
                  backgroundColor: () => (isAuth ? "rgb(102, 187, 106)" : ""),
                }}
              >
                <Typography>
                  1.
                  {isAuth ? (
                    " Войдите "
                  ) : (
                    // @ts-ignore
                    <Button onClick={window.handleSignIn}>Войдите</Button>
                  )}
                  или
                  {isAuth ? (
                    " зарегистрируйтесь"
                  ) : (
                    // @ts-ignore
                    <Button onClick={window.handleSignUp}>
                      зарегистрируйтесь
                    </Button>
                  )}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography>
                  2. Создайте сообщество или вступите в него
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography>
                  3. Создайте тред или откройте уже созданный
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography>
                  4. Решайте задачи и смотрите решения других!
                </Typography>
              </ListItem>
              <Divider />
            </List>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default MainPage;
