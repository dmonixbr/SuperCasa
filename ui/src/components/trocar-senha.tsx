import React from 'react';
import PageLayout from '../shared/page-layout'
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

const TrocarSenha = () => {
    const [senha, setSenha] = React.useState<string>("");
    const [senhaRepetida, setSenhaRepetida] = React.useState<string>("");
    const [submitEnabled, setSubmitEnabled] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (senha === senhaRepetida && senha.length > 0) {
            setSubmitEnabled(true);
        } else {
            setSubmitEnabled(false);
        }
    }, [senha, senhaRepetida]);

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
            onSubmit={() => {}}
            noValidate
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