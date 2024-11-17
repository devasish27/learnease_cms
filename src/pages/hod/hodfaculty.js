import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const HodFaculty = ({ hod }) => {
  const [faculty, setFaculty] = useState([]);

//   useEffect(() => {
//     // Fetch faculty of the same branch as HOD
//     //fetch(/api/getFaculty?branch=${hod.branch})
//       .then(res => res.json())
//       .then(data => setFaculty(data))
//       .catch(err => console.error(err));
//   }, [hod.branch]);

  return (
    <Box>
      <Typography variant="h4">Faculty in {hod.branch} Department</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Employee ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {faculty.map(facultyMember => (
            <TableRow key={facultyMember.id}>
              <TableCell>{facultyMember.name}</TableCell>
              <TableCell>{facultyMember.employeeId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HodFaculty;