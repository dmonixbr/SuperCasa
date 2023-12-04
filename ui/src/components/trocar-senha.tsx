import React from 'react';
import PageLayout from '../shared/page-layout'
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { UserContext } from '../libs/context/user-context';
import userService from '../services/user-service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const TrocarSenha = () => {
    const [senha, setSenha] = React.useState<string>("");
    const [senhaRepetida, setSenhaRepetida] = React.useState<string>("");
    const [submitEnabled, setSubmitEnabled] = React.useState<boolean>(false);

    const { user } = React.useContext(UserContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (senha === senhaRepetida && senha.length > 0) {
            setSubmitEnabled(true);
        } else {
            setSubmitEnabled(false);
        }
    }, [senha, senhaRepetida]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try{
          event.preventDefault();
          if(user){
              const data = new FormData(event.currentTarget);
          
              const resposta = await userService.updateUser({
                id: user.id,
                username: user.username,
                password: data.get('password') as string,
                oldPassword: data.get('senha-antiga') as string,
              });
              
              if (!!resposta) {
                toast.success('Senha trocada com sucesso!');
                navigate('/produtos');
              }
          }
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <PageLayout>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                ml: 'auto',
                mr: 'auto',
            }}>
                <Typography sx={{alignSelf:'center'}} variant="h4" component="h1">
                    Trocar Senha
                </Typography>
            <Box 
            component='form'
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: '100%',
            }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha-antiga"
              label="Senha atual"
              type="password"
              id="senha-antiga"
              autoComplete="senha-atual"
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
              variant="contained"
              fullWidth
              disabled={!submitEnabled}
              sx={{ mt: 3, mb: 2 }}
            >
              Trocar Senha
            </Button>

            </Box>
            </Box>
        </PageLayout>
    )
};

export default TrocarSenha;