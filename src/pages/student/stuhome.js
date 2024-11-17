// src/pages/HomePage2.js
import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import Navbar3 from '../../components/navbar3';
import CalendarComponent from '../../components/CalendarComponent'; // Assuming you have a calendar component
import bgm from '../assests2/new.jpg';

const HomePage3 = () => { 
  return (
    <Box>
      <Navbar3 />
      <Box
        sx={{
          height: '100vh',
          backgroundColor: '#1A2434',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '20px',
          marginTop: '60px'
        }}
      >
        {/* Left Side: Animated Text */}
        <Box sx={{ flex: 1, color: '#E0E8F0', animation: 'fadeIn 2s' }}>
          <Typography variant="h3" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="h5">
            Explore Our Courses and Campus
          </Typography>
        </Box>

        {/* Right Side: Animated Images */}
        <Box sx={{ flex: 1, backgroundImage: `url(${bgm})`, backgroundSize: 'cover', height: '100%', animation: 'fadeIn 3s' }} />

      </Box>

      {/* Know Your Faculty Section */}
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="outlined" href="/faculty" sx={{ color: '#E0E8F0' }}>
          Know Your Faculty
        </Button>
      </Box>

      {/* Calendar Section */}
      <Box sx={{ marginTop: '20px', padding: '20px' }}>
        <CalendarComponent />
      </Box>

      {/* Academic Progress Bar */}
      <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h6" color="#E0E8F0">Academic Progress</Typography>
        <CircularProgress variant="determinate" value={75} /> {/* Example value */}
      </Box>
    </Box>
  );
};

export default HomePage3;
