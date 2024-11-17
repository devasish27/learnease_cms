import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import './Student.css'; 

const Fac = () => {
  const token = localStorage.getItem('token');
  const [rows, setRows] = useState([]);
  //const navigate = useNavigate();

  // Fetch students from the database when the component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:7000/faculty', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching students', error);
    }
  };

 
  // const handleRowClick = (params) => {
  //   navigate(`/profile/${params.id}`);
  // };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 110 },
  ];

  return (
    <div style={{ height: 400, width: '100%', marginTop: '70px', marginLeft:'30px' }}>
     
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        // onRowClick={handleRowClick}
        sx={{
            marginRight:'300px',
        }}
      />
    </div>
  );
};

export default Fac;