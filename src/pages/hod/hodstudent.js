import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const HodStudent = ({ hod }) => {
  const [students, setStudents] = useState([]);

//   useEffect(() => {
//     // Fetch students of the same branch as HOD
//     fetch(/api/getStudents?branch=${hod.branch})
//       .then(res => res.json())
//       .then(data => setStudents(data))
//       .catch(err => console.error(err));
//   }, [hod.branch]);

  return (
    <Box>
      <Typography variant="h4">Students in {hod.branch} Department</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Roll Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.rollNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HodStudent;