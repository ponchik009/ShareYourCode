import React, { ChangeEvent } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
  Box,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import { ILanguage, IPackageCreate } from "../../../interfaces/entities";
import CompileResultDialog from "../../../components/CompileResultDialog/CompileResultDialog";
import { api } from "../../../api";
import Snack from "../../../components/Snack/Snack";

const CreatePackagePage = () => {
  const [code, setCode] = React.useState("");
  const [languageIndex, setLanguageIndex] = React.useState("");
  const [languages, setLanguages] = React.useState<Array<ILanguage>>([]);
  const [languageType, setLanguageType] = React.useState("python");
  const [stdin, setStdin] = React.useState("");
  const [cmdInput, setCmdInput] = React.useState("");

  const [stdout, setStdout] = React.useState("");
  const [stderr, setStderr] = React.useState("");
  const [isDialogResultOpen, setIsDialogResultOpen] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [error, setError] = React.useState("");

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
      .execute(code, stdin, cmdInput, languages[+languageIndex])
      .then(({ out, out_err }) => {
        setStdout(out);
        setStderr(out_err);
        handleDialogOpen();
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => setIsExecuting(false));
  };

  const { groupId, tredId } = useParams();
  const navigate = useNavigate();

  const handleCreate = () => {
    setIsLoading(true);
    // запрос на создание посылки
    api.pack
      .create({
        code,
        language: languages[+languageIndex],
        tredId: +tredId!,
      } as IPackageCreate)
      .then((pack) => {
        // редиректим на страницу треда
        navigate(`/groups/${groupId}/treds/${tredId}`);
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => setIsLoading(false));
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguageIndex(event.target.value);
    switch (languages[+event.target.value].name) {
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
        return;
      }
    }
  };

  React.useEffect(() => {
    // запрос, получаем доступные языки
    setIsLoading(true);
    api.pack
      .getLanguages()
      .then((languages) => {
        setLanguages(languages);
        setLanguageIndex("0");
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="page">
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography>{`Создание посылки в треде id = ${tredId}`}</Typography>
            <Box>
              <Box
                sx={{
                  paddingLeft: "20px",
                  overflow: "auto",
                  minHeight: "30vh",
                  maxHeight: "30vh",
                }}
              >
                <CodeEditor
                  value={code}
                  language={languageType}
                  placeholder="Ваш код здесь"
                  onChange={(evn: ChangeEvent<HTMLTextAreaElement>) =>
                    setCode(evn.target.value)
                  }
                  padding={15}
                  style={{
                    fontSize: 14,
                    backgroundColor: "#C3BFA6",
                    fontFamily:
                      "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                    color: "#000",
                  }}
                />
              </Box>
              <Box sx={{ padding: "20px" }}>
                <FormControl fullWidth>
                  <InputLabel>Язык</InputLabel>
                  <Select
                    value={languageIndex}
                    label="Язык"
                    onChange={handleLanguageChange}
                  >
                    {languages.length &&
                      languages.map((language, index) => (
                        <MenuItem value={index} key={language.id}>
                          {language.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <Typography variant="h6">Раздел компиляции</Typography>
                <TextField
                  label="Стандартный поток ввода"
                  fullWidth
                  multiline
                  value={stdin}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setStdin(event.target.value);
                  }}
                  sx={{ marginTop: "10px" }}
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
                <Button onClick={handleCreate}>Сохранить</Button>
              </Box>
            </Box>
            {/* <CompileResultDialog
              isOpen={isDialogResultOpen}
              onClose={handleDialogClose}
              stdout={stdout}
              stderr={stderr}
            /> */}
          </>
        )}
      </div>
      <Snack
        isOpen={error.length > 0}
        onClose={() => setError("")}
        text={error}
      />
    </>
  );
};

export default CreatePackagePage;
