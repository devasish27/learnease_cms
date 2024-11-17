
// src/pages/Student.js
// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Swal from 'sweetalert2';
// import { Button, Modal, TextField, Box } from '@mui/material';
// //import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import DeleteIcon from '@mui/icons-material/Delete';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import Navbar2 from '../../components/navbar2';
// import { Drawer, Typography, Avatar } from '@mui/material';
// //import LogoutButton from '../../components/Logout';
// //import { Link } from 'react-router-dom';
// import './Student.css';

// const Student = () => {
//   const [rows, setRows] = useState([]);
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [studentForm, setStudentForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     age: '',
//     gender: '',
//     branch: '',
//     phone_number: '',
//     course_duration: '',
//     course_fee: '',
//     total_fee: '',
//   });
//   //const navigate = useNavigate();

//   const [drawerOpen, setDrawerOpen] = useState(false);

//   // Fetch students on component load
//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('http://localhost:7000/students');
//       setRows(response.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   // const handleDelete = async (id) => {
//   //   try {
//   //     await axios.delete(`http://localhost:7000/students/${id}`).then((res)=>{
//   //         if (res.status===204){
//   //           Swal.fire({
//   //             position: "center",
//   //             icon: "success",
//   //             title: "Student deleted successfully",
//   //             showConfirmButton: false,
//   //             timer: 1500
//   //           });
            
//   //         }
//   //         fetchStudents(); 
//   //     });
//   //     // Refresh list after deletion
//   //   } catch (error) {
//   //     console.error('Error deleting student:', error);
//   //   }
//   // };
//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.delete(`http://localhost:7000/students/${id}`);
//       if (res.status === 204) { // Changed from 200 to 204
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Student deleted successfully",
//           showConfirmButton: false,
//           timer: 1500
//         });
//       }
//     } catch (error) {
//       // Handle the error
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Failed to delete student",
//         text: error.response ? error.response.data.error : "An error occurred", // Changed to error.data.error
//         showConfirmButton: true
//       });
//     } finally {
//       fetchStudents(); // Always refresh the student list
//     }
//   };

//   const handleInputChange = (e) => {
//     setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
//   };

//   const handleAddStudent = async () => {
//     try {
//       const response = await axios.post('http://localhost:7000/students', studentForm);
//       if (response.status===200){
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Student added successfully",
//           showConfirmButton: false,
//           timer: 1500
//         });
//         console.log("Added student response:", response.data);
//         fetchStudents();  // Refresh data after adding
//         setOpenAdd(false);  // Close modal
//         resetStudentForm();
//       }
//       else if(response.status===202){
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Email already exits',
//           })
//            }   // Clear form after successful add
//     } catch (error) {
//       Swal.fire({
//         title: "The Internet?",
//         text: "some thing went",
//         icon: "question"
//       });
//       console.error('Error adding student', error);
//     }
//   };
  
//   // Update handleUpdateStudent similarly
//   const handleUpdateStudent = async () => {
//     try {
//       const response = await axios.put(`http://localhost:7000/students/${selectedStudent.id}`, studentForm);
//       if (response.status===200){
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Student updated successfully",
//           showConfirmButton: false,
//           timer: 1500
//           });
//           console.log("Updated student response:", response.data);
//       fetchStudents();  // Refresh data after updating
//       setOpenEdit(false);  // Close modal
//       setSelectedStudent(null);
//       }
//         // Clear selected student
//     } catch (error) {
//       Swal.fire({
//         title: "The Internet?",
//         text: "some thing went",
//         icon: "question"
//         });



//       console.error('Error updating student', error);
//     }
//   };

//   const handleOpenAddModal = () => {
//     resetStudentForm();
//     setOpenAdd(true);
//   };

//   const handleOpenEditModal = (student) => {
//     setSelectedStudent(student);
//     setStudentForm(student);
//     setOpenEdit(true);
//   };

//   const resetStudentForm = () => {
//     setStudentForm({
//       name: '',
//       email: '',
//       password: '',
//       age: '',
//       gender: '',
//       branch: '',
//       phone_number: '',
//       course_duration: '',
//       course_fee: '',
//       total_fee: '',
//     });
//   };

//   const handleCloseAddModal = () => {
//     setOpenAdd(false);
//     resetStudentForm();
//   };

//   const handleCloseEditModal = () => {
//     setOpenEdit(false);
//     resetStudentForm();
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 90 },
//     { field: 'name', headerName: 'Name', width: 150 },
//     { field: 'age', headerName: 'Age', width: 90 },
//     { field: 'branch', headerName: 'Branch', width: 110 },
//     { field: 'gender', headerName: 'Gender', width: 90 },
//     { field: 'phone_number', headerName: 'Contact number', width: 150 },
//     { field: 'course_duration', headerName: 'Duration', width: 90 },
//     { field: 'total_fee', headerName: 'Fee', width: 110 },
//     {
//       field: 'view',
//       headerName: 'View',
//       width: 150,
//       renderCell: (params) => (
//           <Button
//             variant="contained"
//             startIcon={<VisibilityIcon />}
//             onClick={() => fetchStudentById(params.row.id)}
//           >
//             View
//           </Button>
        
//       ),
//     },
//     {
//       field: 'update',
//       headerName: 'Update',
//       width: 150,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<EditIcon />}
//           onClick={() => handleOpenEditModal(params.row)}
//         >
//           Update
//         </Button>
//       ),
//     },
//     {
//       field: 'delete',
//       headerName: 'Delete',
//       width: 150,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           color="warning"
//           startIcon={<DeleteIcon />}
//           onClick={() => handleDelete(params.row.id)}
//         >
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   const fetchStudentById = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:7000/students/${id}`);
//       setSelectedStudent(response.data);
//       setDrawerOpen(true); // Open drawer after fetching data
//     } catch (error) {
//       console.error('Error fetching student details:', error);
//     }
//   };

//   const handleCloseDrawer = () => {
//     setDrawerOpen(false);
//     setSelectedStudent(null);
//   };

//   return (
//     <div style={{ height: 400, width: '100%', marginTop: '80px', marginLeft: '30px' }}>
//       <Navbar2 />
//       <Button variant="contained" color="primary" startIcon={<PersonAddIcon />} onClick={handleOpenAddModal}>
//         Add Student
//       </Button>
//       <DataGrid rows={rows} columns={columns} pageSize={25} sx={{ marginRight: '300px', height: '700px' }} />

//       {/* Add Student Modal */}
//       <Modal open={openAdd} onClose={handleCloseAddModal}>
//         <Box id="student-modal">
//           <h2>Add Student</h2>
//           {['name', 'email', 'password', 'age', 'gender', 'branch', 'phone_number', 'course_duration', 'course_fee', 'total_fee'].map((field) => (
//             <TextField
//               key={field}
//               label={field.replace('_', ' ').toUpperCase()}
//               name={field}
//               fullWidth
//               value={studentForm[field]}
//               onChange={handleInputChange}
//               margin="normal"
//             />
//           ))}
//           <Button variant="contained" color="primary" onClick={handleAddStudent} fullWidth sx={{ mt: 2 }}>
//             Add Student
//           </Button>
//         </Box>
//       </Modal>

//       {/* Edit Student Modal */}
//       <Modal open={openEdit} onClose={handleCloseEditModal}>
//         <Box id="student-modal">
//           <h2>Edit Student</h2>
//           {['name', 'email',  'age', 'gender', 'branch', 'phone_number', 'course_duration', 'course_fee', 'total_fee'].map((field) => (
//             <TextField
//               key={field}
//               label={field.replace('_', ' ').toUpperCase()}
//               name={field}
//               fullWidth
//               value={studentForm[field]}
//               onChange={handleInputChange}
//               margin="normal"
//             />
//           ))}
//           <Button variant="contained" color="primary" onClick={handleUpdateStudent} fullWidth sx={{ mt: 2 }}>
//             Update Student
//           </Button>
//         </Box>
//       </Modal>

//       <Drawer anchor="center" open={drawerOpen} onClose={handleCloseDrawer}>
//         {selectedStudent && (
//           <Box
//             sx={{
//               width: 300,
//               padding: 3,
//               backgroundColor: '#f5f5f5',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 100,
//                 height: 100,
//                 border: '2px solid white',
//                 marginBottom: 2,
//               }}
//             />
//             <Typography variant="h6" align="center">
//               {selectedStudent.name}
//             </Typography>
//             <Box mt={2}>
//               <Typography variant="body1">Email: {selectedStudent.email}</Typography>
//               <Typography variant="body1">Age: {selectedStudent.age}</Typography>
//               <Typography variant="body1">Branch: {selectedStudent.branch}</Typography>
//               <Typography variant="body1">Phone: {selectedStudent.phone_number}</Typography>
//               {/* Add other details as necessary */}
//             </Box>
//           </Box>
//         )}
//       </Drawer>
//     </div>
//   );
// };

// export default Student;

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { Modal, Box, IconButton, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Typography, Avatar } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Navbar2 from '../../components/navbar2';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import './Student.css';
import Footer from '../../components/footer';

const Student = () => {
  const token = localStorage.getItem('token');
  const [rows, setRows] = useState([]);
  const [branches, setBranches] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);  // State to manage "View" modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    branch: '',
    phone_number: '',
    course_duration: '',
    course_fee: '',
    total_fee: '',
    joindate:'',
  });

  useEffect(() => {
    fetchStudents();
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get('http://localhost:7000/branches', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBranches(response.data); // Assuming the response returns an array of branches
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

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

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:7000/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 204) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Student deleted successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to delete student",
        text: error.response ? error.response.data.error : "An error occurred",
        showConfirmButton: true
      });
    } finally {
      fetchStudents();
    }
  };

  const handleInputChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('http://localhost:7000/students', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }, studentForm);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Student added successfully",
          showConfirmButton: false,
          timer: 1500
        });
        fetchStudents();
        setOpenAdd(false);
        resetStudentForm();
      } else if (response.status === 202) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email already exists',
        });
      }
    } catch (error) {
      Swal.fire({
        title: "The Internet?",
        text: "Something went wrong",
        icon: "question"
      });
      console.error('Error adding student', error);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      const response = await axios.put(`http://localhost:7000/students/${selectedStudent.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }, studentForm);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Student updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
        fetchStudents();
        setOpenEdit(false);
        setSelectedStudent(null);
      }
    } catch (error) {
      Swal.fire({
        title: "The Internet?",
        text: "Something went wrong",
        icon: "question"
      });
      console.error('Error updating student', error);
    }
  };

  const handleOpenAddModal = () => {
    resetStudentForm();
    setOpenAdd(true);
  };

  const handleOpenEditModal = (student) => {
    setSelectedStudent(student);
    setStudentForm(student);
    setOpenEdit(true);
  };

  const resetStudentForm = () => {
    setStudentForm({
      name: '',
      email: '',
      password: '',
      age: '',
      gender: '',
      branch: '',
      phone_number: '',
      course_duration: '',
      course_fee: '',
      total_fee: '',
      joindate: "",
    });
  };

  const handleCloseAddModal = () => {
    setOpenAdd(false);
    resetStudentForm();
  };

  const handleCloseEditModal = () => {
    setOpenEdit(false);
    resetStudentForm();
  };

  const handleOpenViewModal = (student) => {
    setSelectedStudent(student);
    setOpenView(true);
  };

  const handleCloseViewModal = () => {
    setOpenView(false);
    setSelectedStudent(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'age', headerName: 'Age', width: 60 },
    { field: 'branch', headerName: 'Branch', width: 100 },
    { field: 'gender', headerName: 'Gender', width: 60 },
    { field: 'email', headerName: 'E-mail', width: 220 },  // Added E-mail column
    { field: 'phone_number', headerName: 'Contact number', width: 110 },
    { field: 'joindate', headerName: 'Joining Date', width: 150 },
    { field: 'course_duration', headerName: 'Duration', width: 90 },
    { field: 'total_fee', headerName: 'Fee', width: 110 },
    {
      field: 'view',
      headerName: 'View',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<VisibilityIcon />}
          onClick={() => handleOpenViewModal(params.row)}
        >
          View
        </Button>
      ),
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => handleOpenEditModal(params.row)}
        >
          Update
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="warning"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%', marginTop: '80px', marginLeft: '30px' }}>
      <Navbar2 />
      <Button variant="contained" color='info' startIcon={<PersonAddIcon />} onClick={handleOpenAddModal}>
        Add Student
      </Button>
      <DataGrid rows={rows} columns={columns} pageSize={25} sx={{ marginRight: '300px', height: '700px', width:'90%' }} />


      <Modal open={openAdd} onClose={handleCloseAddModal}>
      <Box id="student-modal">
        <IconButton
          onClick={handleCloseAddModal}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <h2>Add Student</h2>

        <TextField
          label="NAME"
          name="name"
          fullWidth
          value={studentForm.name}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <TextField
          label="EMAIL"
          name="email"
          fullWidth
          value={studentForm.email}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <TextField
          label="PASSWORD"
          name="password"
          fullWidth
          value={studentForm.password}
          onChange={handleInputChange}
          margin="normal"
          required
          type="password"
        />

        <TextField
          label="AGE"
          name="age"
          fullWidth
          value={studentForm.age}
          onChange={handleInputChange}
          margin="normal"
          required
          type="number"
        />

        {/* Gender dropdown */}
        <TextField
          label="GENDER"
          name="gender"
          select
          fullWidth
          value={studentForm.gender}
          onChange={handleInputChange}
          margin="normal"
          required
        >
          {['Male', 'Female', 'Rather Not Say'].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Branch dropdown - assumes branches are fetched and stored in branchOptions */}
        <TextField
          label="BRANCH"
          name="branch"
          select
          fullWidth
          value={studentForm.branch}
          onChange={handleInputChange}
          margin="normal"
          required
        >
          {branches.map((branch) => (
            <MenuItem key={branch.id} value={branch.name}>
              {branch.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="PHONE NUMBER"
          name="phone_number"
          fullWidth
          value={studentForm.phone_number}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <TextField
          label="JOIN DATE"
          name="joindate"
          type="date"
          fullWidth
          value={studentForm.joindate}
          onChange={handleInputChange}
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="COURSE DURATION"
          name="course_duration"
          fullWidth
          value={studentForm.course_duration}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <TextField
          label="COURSE FEE"
          name="course_fee"
          fullWidth
          value={studentForm.course_fee}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <TextField
          label="TOTAL FEE"
          name="total_fee"
          fullWidth
          value={studentForm.total_fee}
          onChange={handleInputChange}
          margin="normal"
          required
        />

        <Button variant="contained" color="primary" onClick={handleAddStudent} fullWidth sx={{ mt: 2 }}>
          Add Student
        </Button>
      </Box>
</Modal>


      {/* Edit Student Modal */}
      <Modal open={openEdit} onClose={handleCloseEditModal}>
  <Box id="student-modal" sx={{ position: 'relative', padding: '20px', backgroundColor: 'white', borderRadius: '8px', width: '60%', margin: '5% auto', boxShadow: 24 }}>
    {/* Close button at the top right corner */}
    <IconButton
      onClick={handleCloseEditModal}
      sx={{ position: 'absolute', top: 8, right: 8 }}
    >
      <CloseIcon />
    </IconButton>
    
    <h2>Edit Student</h2>

    {/* Fetch branches for dropdown */}
    {useEffect(() => {
      fetch('/branches')
        .then((response) => response.json())
        .then((data) => setBranches(data))
        .catch((error) => console.error('Error fetching branches:', error));
    }, [])}

    {['name', 'email', 'age', 'phone_number', 'joindate', 'course_duration', 'course_fee', 'total_fee'].map((field) => (
      <TextField
        key={field}
        label={field.replace('_', ' ').toUpperCase()}
        name={field}
        fullWidth
        value={studentForm[field]}
        onChange={handleInputChange}
        margin="normal"
      />
    ))}

    {/* Gender Dropdown */}
    <FormControl fullWidth margin="normal">
      <InputLabel>Gender</InputLabel>
      <Select
        name="gender"
        value={studentForm.gender}
        onChange={handleInputChange}
        label="Gender"
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Rather Not Say">Rather Not Say</MenuItem>
      </Select>
    </FormControl>

    {/* Branch Dropdown */}
    <FormControl fullWidth margin="normal">
      <InputLabel>Branch</InputLabel>
      <Select
        name="branch"
        value={studentForm.branch}
        onChange={handleInputChange}
        label="Branch"
      >
        {branches.map((branch) => (
          <MenuItem key={branch.id} value={branch.name}>
            {branch.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Update button */}
    <Button
      variant="contained"
      color="primary"
      onClick={handleUpdateStudent}
      fullWidth
      sx={{ mt: 2 }}
    >
      Update Student
    </Button>
  </Box>
</Modal>

      {/* View Student Modal */}
      <Modal open={openView} onClose={handleCloseViewModal}>
  <Box id="student-view-modal">
    <IconButton
      onClick={handleCloseViewModal} // Update here
      sx={{ position: 'absolute', top: 8, right: 8 }}
    >
      <CloseIcon />
    </IconButton>
    {selectedStudent && (
      <>
        <Avatar
          sx={{ width: 120, height: 120, margin: 'auto', border: '4px solid white' }}
          src={selectedStudent.profilePicture || '/default-profile.png'}
        />
        <Typography variant="h5" align="center">{selectedStudent.name}</Typography>
        <Typography variant="body1" align="center">{selectedStudent.email}</Typography>
        <Typography variant="body1">Age: {selectedStudent.age}</Typography>
        <Typography variant="body1">Gender: {selectedStudent.gender}</Typography>
        <Typography variant="body1">Branch: {selectedStudent.branch}</Typography>
        <Typography variant="body1">Phone: {selectedStudent.phone_number}</Typography>
        <Typography variant="body1">Joining Date: {selectedStudent.joindate}</Typography>
        <Typography variant="body1">Course Duration: {selectedStudent.course_duration}</Typography>
        <Typography variant="body1">Total Fee: {selectedStudent.total_fee}</Typography>

        <Button variant="contained" color="primary" startIcon={<EditIcon />}>
          Update
        </Button>

        <Button
          variant="contained"
          color="warning"
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(selectedStudent.id)} // Pass the student ID here
        >
          Delete
        </Button>
      </>
    )}
  </Box>
</Modal>
    <Footer />
    </div>
  );
};

export default Student;