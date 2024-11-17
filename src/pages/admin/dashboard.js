import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const Dashboard = () => {
   // const token = localStorage.getItem('token');
  const [rows, setRows] = useState([]);
  const [columns] = useState([
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'age', headerName: 'Age', width: 90 },
  ]);

  useEffect(() => {
    axios.get('http://localhost:7000/students')
      .then(response => setRows(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default Dashboard;
