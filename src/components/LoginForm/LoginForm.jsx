import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { maxWidth } from '@mui/system';

const useStyles = makeStyles((theme) => ({

  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  formPanel: {
    backgroundColor: '#fff',
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    
    margin: '0 auto',
    marginTop: theme.spacing(8),
  },
  submitButton: {
    backgroundColor: '#f70',
    color: '#fff',
    marginTop: theme.spacing(2),
    '&:hover': {
      backgroundColor: '#c50',
    },
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };
  
  return (
    <div style={{ backgroundColor: '#333' }}>
    <div className={classes.container}>
      <form className={classes.formPanel} style={{maxWidth: 800}} onSubmit={login}>
        <h2>Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <div>
          <TextField
            id="username"
            label="Username"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <Button
            className={classes.submitButton}
            type="submit"
            name="submit"
            variant="contained"
            fullWidth
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
