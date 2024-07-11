import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, styled, Typography } from '@mui/material';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #E0F7FA;
  height: 100vh;
  padding: 20px;
`;

const Header = styled(Typography)`
  font-size: 4.5rem;
  font-weight: bold;
  text-align: left;
`;

const SubHeader = styled(Typography)`
  margin-top: 20px;
  font-size: 1.5rem;
  text-align: left;
`;

const ButtonContainer = styled(Box)`
  margin-top: 40px;
  display: flex;
  gap: 20px;
`;

const CircleImage = styled(Box)`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 60px;
`;

const StyledButton = styled(Button)`
  padding: 6px 16px;
  font-size: 0.875rem;
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 3, textAlign: 'left' }}>
        BlogSphere
      </Typography>
      <ContentContainer>
        <Box>
          <Header>
            Elevate human connections<br />in real time
          </Header>
          <SubHeader>
            "Connecting Minds, One Post at a Time"
          </SubHeader>
          <ButtonContainer>
            <StyledButton variant="outlined" onClick={handleLoginClick}>Login</StyledButton>
            <StyledButton variant="contained" onClick={handleSignupClick}>SignUp</StyledButton>
          </ButtonContainer>
        </Box>
        <CircleImage>
          <img src="https://www.careerguide.com/career/wp-content/uploads/2021/07/Purpose-of-Blogging.jpeg" alt="Blog" />
        </CircleImage>
      </ContentContainer>
    </Container>
  );
};

export default LandingPage;
