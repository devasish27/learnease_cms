import React, { useEffect, useState } from 'react';
import { CardContent, Typography, Grid,  Box} from '@mui/material';
//import Swal from 'sweetalert2';
import axios from 'axios';
//import './pages/admin/branch.css'; // Import custom CSS

const Branchl = () => {
  const token = localStorage.getItem('token');
  const [branches, setBranches] = useState([]);
  // Fetch branches when the component mounts
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:7000/branches', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setBranches(response.data);
    } catch (error) {
      console.error("There was an error fetching the branches!", error);
    }
  };


  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3} sx={{marginBottom:4}}>
        {branches.map((branch) => (
          <Grid item xs={12} sm={6} md={4} key={branch.id}>
            <CardContent className="branch-card">
              <Typography variant="h5" className="branch-name">
                {branch.name}
              </Typography>
              <Typography variant="body2">Staff: {0}</Typography>
              <Typography variant="body2">Students: {0}</Typography>
            </CardContent>
          </Grid>
         
        ))}
        </Grid>
  </Box>
)
}

export default Branchl;