import React, { useEffect, useState } from 'react';
import { CardContent, Typography, Grid, Button, Box, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import './branch.css';
import Navbar2 from '../../components/navbar2';
import Footer from '../../components/footer';

const BranchList = () => {
  const token = localStorage.getItem('token');
  const [branches, setBranches] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false); // Control form visibility
  const [branchName, setBranchName] = useState({ branch: '' }); // State for new branch

  // Fetch branches when the component mounts


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

  // Delete branch by ID
  const deleteBranch = (id) => {
    axios
      .delete(`http://localhost:7000/branch/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(async(response) => {
        if (await response.status === 200) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });}
      })
      .catch((error) => {
        console.error("Error deleting the branch!", error);
      });
      window.location.reload();
  };

  // Handle input change for the new branch form
  const handleInputChange = (e) => {
    setBranchName({ ...branchName, [e.target.name]: e.target.value });
  };

  // Add new branch
  const handleAddBranch = () => {
    axios
      .post('http://localhost:7000/addbranch', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }, branchName)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Branch added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          fetchBranches(); // Refresh list after addition
          setIsFormVisible(false); // Hide form after submission
          setBranchName({ branch: '' }); // Reset form
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <Box>
    <Box sx={{ padding: 4 }}>
      <Navbar2 />
      {/* Grid to display branches */}
      <Grid container spacing={3} sx={{marginBottom:4, marginTop:'70px'}}>
        {branches.map((branch) => (
          <Grid item xs={12} sm={6} md={4} key={branch.id}>
            <CardContent className="branch-card">
              <Typography variant="h5" className="branch-name">
                {branch.name}
              </Typography>
              <Typography variant="body2">Staff: {0}</Typography>
              <Typography variant="body2">Students: {0}</Typography>
              <Button
                variant="contained"
                color='error'
                className="delete-button"
                onClick={() => deleteBranch(branch.id)}
              >
                Delete Branch
              </Button>
            </CardContent>
          </Grid>
        ))}
      </Grid>

      {/* Button to toggle form visibility */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="add-branch-button"
      >
        {isFormVisible ? 'Cancel' : 'Add Branch'}
      </Button>

      {/* Form to add a new branch */}
      {isFormVisible && (
        <Box id="add-branch-form" className="branch-form" sx={{ marginTop: 4, marginRight:"700px"  }}>
          <TextField
            name="branch"
            label="Branch Name"
            variant="outlined"
            fullWidth
            value={branchName.branch}
            onChange={handleInputChange}
            className="branch-input"
            sx={{ marginBottom: 6 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBranch}
            className="submit-branch-button"
          >
            Submit
          </Button>
        </Box>
      )}

      </Box>
      <Footer />
    </Box>

  );
};

export default BranchList;
