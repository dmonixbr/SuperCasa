import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { UserContext } from "../libs/context/user-context";
import userApi from "../libs/api/features/user";
import { IUser } from "../typings/user";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const CriarConta = (props: any) => {
  const { isSignedIn } = React.useContext(UserContext);

  const [senha, setSenha] = React.useState<string>("");
  const [senhaRepetida, setSenhaRepetida] = React.useState<string>("");
  const [submitEnabled, setSubmitEnabled] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isSignedIn) {
      navigate("/produtos");
    }
  }, []);

  const { handleLogin } = React.useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const respostaCriarUsuario = await userApi.createUser({
      username: data.get("username") as string,
      password: data.get("password") as string,
    });

    if (respostaCriarUsuario.status === 201) {
      const resposta = await userApi.loginUser({
        username: data.get("username") as string,
        password: data.get("password") as string,
      });
      if (resposta.status === 200) {
        const user = resposta.data as IUser;
        handleLogin(user);
        navigate("/produtos");
      }
    }
  };

  React.useEffect(() => {
    if (senha !== senhaRepetida) {
      setSubmitEnabled(false);
    } else if (senha === senhaRepetida && senha.length > 0) {
      setSubmitEnabled(true);
    }
  }, [senha, senhaRepetida]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Criar contar!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nome de usuário"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password-repeat"
              label="Repetir senha"
              type="password"
              id="password-repeat"
              autoComplete="current-password"
              value={senhaRepetida}
              onChange={(event) => setSenhaRepetida(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!submitEnabled}
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  Já sou cadastrado!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CriarConta;
