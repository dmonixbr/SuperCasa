import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { UserContext } from '../libs/context/user-context';
import userService from '../services/user-service';
import { IUser } from '../typings/user';
import { toast } from 'react-toastify';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Testes de software © '}
      <Link color="inherit" href="https://mui.com/">
        Victor Vieira e Beatriz Ferreira
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const SignIn = (props: any) => {

  const { handleLogin, isSignedIn, handleValidateUser } = React.useContext(UserContext);
  const [jwtToken, setJwtToken] = React.useState<string | null>(localStorage.getItem('JWT'));

  React.useEffect(() => {
    if (jwtToken) {
      userService
      .validateUser()
      .then((res) => {
        handleValidateUser({...res, JWT: jwtToken});
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [jwtToken]);

  React.useEffect(() => {
    if (isSignedIn) {
      setJwtToken(null);
      navigate('/produtos');
    }
  }, [isSignedIn])

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try{
      event.preventDefault();
      const data = new FormData(event.currentTarget);
  
      const resposta = await userService.loginUser({
        username: data.get('username') as string,
        password: data.get('password') as string,
      });
      
      if (!!resposta) {
        const user = resposta as IUser;
        localStorage.setItem('JWT', user.JWT!);
        handleLogin(user);
        navigate('/produtos');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Faça login!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/criar-conta" variant="body2">
                  Criar uma conta!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;