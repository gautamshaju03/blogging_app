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
  font-size: 3rem;
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
  width: 400px; /* Increased width */
  height: 400px; /* Increased height */
  border-radius: 50%;
  overflow: hidden;
  margin-left: auto; /* Pushes image to the right */
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Distribute space between elements */
  width: 100%;
  margin-top: 60px;
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
            <Button variant="outlined" onClick={handleLoginClick}>Login</Button>
            <Button variant="contained" onClick={handleSignupClick}>SignUp</Button>
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
