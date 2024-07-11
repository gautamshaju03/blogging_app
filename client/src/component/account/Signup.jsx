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

const signupInitialValues = {
  name: "",
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

const Signup = () => {
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState('');
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    if (!isPasswordStrong(signup.password)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      return;
    }

    try {
      const response = await API.userSignup(signup);
      if (response.isSuccess) {
        setSignup(signupInitialValues);
        setError('');
        alert("Account created successfully. Please login.");
        navigate('/login');
      } else {
        setError("Something went wrong! Try again");
      }
    } catch (error) {
      console.error('Error signing up', error);
      setError('An error occurred during signup. Please try again.');
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
          <TextField label="Name" name="name" value={signup.name} onChange={onInputChange} variant="outlined" />
          <TextField label="Username" name="username" value={signup.username} onChange={onInputChange} variant="outlined" />
          <TextField label="Password" name="password" value={signup.password} onChange={onInputChange} type="password" variant="outlined" />
          {error && <P>{error}</P>}
          <StyledButton variant="contained" onClick={signupUser}>SignUp</StyledButton>
          <P>OR</P>
          <Button variant="outlined" onClick={() => navigate('/login')}>Already have an Account?</Button>
        </Wrapper>
      </Component>
    </Box>
  );
};

export default Signup;
