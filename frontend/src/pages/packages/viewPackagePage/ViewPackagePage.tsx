import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useNavigate, useParams } from "react-router-dom";
import { IPackage } from "../../../interfaces/entities";
import CompileResultDialog from "../../../components/CompileResultDialog/CompileResultDialog";
import { useAppSelector } from "../../../hooks/hooks";
import { api } from "../../../api";

const ViewPackagePage = () => {
  const [pack, setPack] = React.useState<IPackage>();

  const [review, setReview] = React.useState("");

  const [stdin, setStdin] = React.useState("");
  const [cmdInput, setCmdInput] = React.useState("");

  const [stdout, setStdout] = React.useState("");
  const [stderr, setStderr] = React.useState("");
  const [isDialogResultOpen, setIsDialogResultOpen] = React.useState(false);

  const [isExecuting, setIsExecuting] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { user } = useAppSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const { groupId, packageId, tredId } = useParams();

  const [languageType, setLanguageType] = React.useState("python");

  const handleDialogOpen = () => {
    setIsDialogResultOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogResultOpen(false);
  };
  const handleCompile = () => {
    // отправляем код на компиляцию
    // записываем результаты и открываем окно
    setIsExecuting(true);
    api.pack
      .execute(pack!.code, stdin, cmdInput, pack!.language)
      .then(({ out, out_err }) => {
        setStdout(out);
        setStderr(out_err);
        handleDialogOpen();
      })
      .catch((err) => setMessage(err.response.data.message))
      .finally(() => setIsExecuting(false));
  };
  const handleReview = () => {
    setIsLoading(true);
    api.pack
      .review(pack!.id, review)
      .then((pack) => {
        setPack(pack);
        setMessage("Ревью успешно записано!");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setPack(undefined);
      })
      .finally(() => setIsLoading(false));
  };

  const handleLanguageTypeChange = () => {
    switch (pack?.language.name) {
      case "python": {
        setLanguageType("python");
        return;
      }
      case "javascript": {
        setLanguageType("javascript");
        return;
      }
      case "c-compile": {
        setLanguageType("c");
        return;
      }
      case "c++-compile": {
        setLanguageType("cpp");
        return;
      }
      default: {
        setLanguageType("python");
        return;
      }
    }
  };

  React.useEffect(() => {
    // загрузка посылки
    setIsLoading(true);
    const packPromise = api.pack.get(+packageId!);
    const adminPromise = api.tred.get(+tredId!);

    Promise.all([packPromise, adminPromise])
      .then(([pack, tred]) => {
        setPack(pack);
        setIsAdmin(tred.group.admin.id === user?.id);
        handleLanguageTypeChange();
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="page">
        {isLoading ? (
          <CircularProgress />
        ) : pack ? (
          <Box>
            <Typography>{`Посылка с id = ${pack.id} авторства ${pack.user.name}`}</Typography>
            <Box
              sx={{
                paddingLeft: "20px",
                overflow: "auto",
                maxHeight: "30vh",
              }}
            >
              <CodeEditor
                value={pack.code}
                language={languageType}
                placeholder="Ваш код здесь"
                padding={15}
                style={{
                  fontSize: 14,
                  backgroundColor: "#C3BFA6",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                  color: "#000",
                }}
                disabled
              />
            </Box>
            <TextField
              value={pack.language.name}
              fullWidth
              label="Язык"
              sx={{
                marginTop: "10px",
                color: "#000",
              }}
            />
            <Typography variant="h6">Раздел компиляции</Typography>
            <TextField
              label="Стандартный поток ввода"
              fullWidth
              multiline
              value={stdin}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setStdin(event.target.value);
              }}
              sx={{
                marginTop: "10px",
              }}
              className="field"
            />
            <TextField
              label="Аргументы командной строки"
              fullWidth
              multiline
              value={cmdInput}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCmdInput(event.target.value);
              }}
              sx={{ marginTop: "10px" }}
            />
            <Button onClick={handleCompile}>Скомпилировать</Button>
            {isExecuting ? (
              <Box>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <TextField
                  label="Стандартный поток вывода"
                  fullWidth
                  multiline
                  value={stdout}
                />
                <TextField
                  label="Поток ошибок"
                  fullWidth
                  multiline
                  value={stderr}
                  sx={{ marginTop: "10px" }}
                />
              </>
            )}
            {isAdmin ? (
              <>
                <Typography variant="h6">Раздел оценивания</Typography>
                <TextField
                  label="Ваш отзыв"
                  fullWidth
                  multiline
                  value={review}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setReview(event.target.value);
                  }}
                  sx={{ marginTop: "10px" }}
                />
                <Button onClick={handleReview}>Сохранить</Button>
              </>
            ) : (
              user?.id === pack.user.id && (
                <>
                  <Typography variant="h6">Раздел оценивания</Typography>
                  <TextField
                    label="Отзыв администратора"
                    fullWidth
                    multiline
                    value={review}
                    disabled
                    sx={{ marginTop: "10px" }}
                  />
                </>
              )
            )}
            {/* <CompileResultDialog
              isOpen={isDialogResultOpen}
              onClose={handleDialogClose}
              stdout={stdout}
              stderr={stderr}
            /> */}
          </Box>
        ) : (
          <Typography>{error}</Typography>
        )}
      </div>
      <Snackbar open={message.length > 0} onClose={() => setMessage("")}>
        <Alert
          severity="info"
          sx={{ width: "100%" }}
          onClose={() => setMessage("")}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ViewPackagePage;
