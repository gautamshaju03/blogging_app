import React, { useState, useContext } from 'react';
import { Box, TextField, Button, styled } from '@mui/material';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
  background-color: #fff;
  border-radius: 10px;
`;

const H1 = styled('h1')({
  width: '100px',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  padding: '50px 0 0',
  color: '#333'
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
`;

const P = styled('p')({
  margin: 'auto',
  padding: '10px 0',
  textAlign: 'center',
});

const StyledButton = styled(Button)`
  background-color: #004d40;
  color: white;

  &:hover {
    background-color: #00796b;
  }
`;

const loginInitialValues = {
  username: "",
  password: ""
};

const isPasswordStrong = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState('');
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    if (!isPasswordStrong(login.password)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      return;
    }

    try {
      const response = await API.userLogin(login);
      if (response.isSuccess) {
        setError('');
        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccount({ username: response.data.username, name: response.data.name });
        isUserAuthenticated(true);
        navigate("/", { replace: true });
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error('Error logging in', error);
      setError('Error logging in...Please try again');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: "#E0F7FA"
      }}
    >
      <Component>
        <H1>BlogSphere</H1>
        <Wrapper>
          <TextField label="Username" name="username" value={login.username} onChange={onValueChange} variant="outlined" />
          <TextField label="Password" name="password" value={login.password} onChange={onValueChange} type="password" variant="outlined" />
          {error && <P>{error}</P>}
          <StyledButton variant="contained" onClick={loginUser}>Login</StyledButton>
          <P>OR</P>
          <Button variant="outlined" onClick={() => navigate('/signup')}>Create an Account</Button>
        </Wrapper>
      </Component>
    </Box>
  );
};

export default Login;
