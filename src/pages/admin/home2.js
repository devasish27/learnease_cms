// src/pages/HomePage1.js
import React, {useState} from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import CalendarComponent from '../../components/CalendarComponent'; // Assuming you have a calendar component
import EventEditor from '../../components/EventEditor'; // Component for editing calendar events
import Navbar2 from '../../components/navbar2';
import './home2.css';
import image1 from '../assests2/resized_image.png';
import image2 from '../assests2/faculty.jpg';
import image3 from "../assests2/image3.webp";
import image from '../assests2/image2.jpg';
import Footer from '../../components/footer';


const HomePage2 = () => {
  const [events, setEvents] = useState([]);

  const handleEventAdd = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <Box id="homepage1-root">
      <Navbar2 />
      
      <Box className="header-section" sx={{ marginTop: '70px' }}>
        <Typography variant="h3" color="#E0E8F0" textAlign="center" className="welcome-text">
          Welcome Admin
        </Typography>
      </Box>

      {/* Right Side Cards with Navigation */}
      <Grid container spacing={2} justifyContent="center" marginY="20px" id="navigation-cards">
      <Card className="info-card" onClick={() => window.location.href = "/dashboard"}>
            <CardMedia
              component="img"
              height="150"
              image={image3} // Demo image URL
              alt="dashboard"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text">Dashboard</Typography>
            </CardContent>
          </Card>
        <Grid item xs={3}>
        <Card className="info-card" onClick={() => window.location.href = "/createquiz"}>
            <CardMedia
              component="img"
              height="150"
              image={image3} // Demo image URL
              alt="create quiz"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text">Create Quiz</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className="nav-card">
            <CardActionArea href="/hod">
              <CardMedia
                component="img"
                height="150"
                image="https://via.placeholder.com/300x200" // Demo image URL
                alt="Page 2"
              />
              <CardContent>
                <Typography variant="h6" className="nav-card-text">Hod</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {/* Information Cards for Student, Faculty, Branch */}
      <Grid container spacing={2} justifyContent="center" id="info-cards">
        <Grid item xs={3}>
          <Card className="info-card" onClick={() => window.location.href = "/student"}>
            <CardMedia
              component="img"
              height="150"
              image={image1} // Demo image URL
              alt="View Students"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text">View Students</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className="info-card" onClick={() => window.location.href = "/staff"}>
            <CardMedia
              component="img"
              height="150"
              image= {image2}
              alt="View Faculty"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text">View Faculty</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className="info-card" onClick={() => window.location.href = "/branch"}>
            <CardMedia
              component="img"
              height="150"
              image= {image}
              alt="View Branches"
            />
            <CardContent>
              <Typography variant="h6" className="info-card-text">View Branches</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Calendar and EventEditor */}
      <Box display="flex" padding="20px" id="calendar-editor">
        <Box sx={{ flex: 1 }}>
          <CalendarComponent events={events} /> {/* Pass events if needed */}
        </Box>
        <Box sx={{ flex: 1 }}>
          <EventEditor onEventAdd={handleEventAdd} /> {/* Pass the handler */}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
export default HomePage2;
