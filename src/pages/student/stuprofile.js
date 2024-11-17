import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Drawer, Typography, Avatar, Box } from '@mui/material';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LogoutButton from '../../components/Logout';

const Stu = () => {
  const token = localStorage.getItem('token');
  const [rows, setRows] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  
  const fetchStudents = async () => {
    
    try {
      const response = await axios.get('http://localhost:7000/students', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchStudentById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:7000/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      setSelectedStudent(response.data);
      setDrawerOpen(true); // Open drawer after fetching data
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedStudent(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    {
      field: 'view',
      headerName: 'View Profile',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          startIcon={<VisibilityIcon />}
          onClick={() => fetchStudentById(params.row.id)}
        >
          Profile
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={25} />

      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        {selectedStudent && (
          <Box
            sx={{
              width: 300,
              padding: 3,
              backgroundColor: '#f5f5f5',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                border: '2px solid white',
                marginBottom: 2,
              }}
            />
            <Typography variant="h6" align="center">
              {selectedStudent.name}
            </Typography>
            <Box mt={2}>
              <Typography variant="body1">Email: {selectedStudent.email}</Typography>
              <Typography variant="body1">Age: {selectedStudent.age}</Typography>
              <Typography variant="body1">Branch: {selectedStudent.branch}</Typography>
              <Typography variant="body1">Phone: {selectedStudent.phone_number}</Typography>
              {/* Add other details as necessary */}
            </Box>
          </Box>
        )}
        <LogoutButton />
      </Drawer>
      
    </div>
  );
};

export default Stu;