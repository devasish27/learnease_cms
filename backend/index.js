const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');




app.use(cors());
app.use(bodyParser.json());
const PORT = 7000;

// Database Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'learnadmins'
});

connection.connect((err) => {
    if (!err) {
        console.log('Database connection successful');
    } else {
        console.log('Database connection failed:', err);
    }
});




// Login API with role-based authentication
// login api

const checkAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is required.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  if (!token) {
      return res.status(401).json({ error: 'Token is missing.' });
  }

  jwt.verify(token, 'yourSecretKey', (err, user) => {
      if (err) {
          console.error("Token verification error:", err);
          return res.status(403).json({ error: 'Invalid or expired token.' });
      }
      req.user = user.payload; // Attach decoded user data to request
      next();
  });
};






app.post("/login", (request, response) => {
  const { email, password } = request.body;

  connection.query('SELECT * FROM login WHERE email = ?', [email], async (err, results) => {
      if (err) {
          console.error("Database query error:", err);
          return response.status(500).json({ message: "Internal server error" });
      }

      // Check if results contain data
      if (results && results.length > 0) {
          try {
              const compare = await bcrypt.compare(password, results[0].password);
              if (compare) {
                  const token = jwt.sign({ payload: results[0] }, 'yourSecretKey', { expiresIn: '1h' });
                  return response.status(200).json({ message: 'Login successful', role: results[0].role, token });
              } else {
                  return response.status(401).send("Invalid password");
              }
          } catch (hashError) {
              console.error("Password comparison error:", hashError);
              return response.status(500).json({ message: "Internal server error" });
          }
      } else {
          return response.status(401).send("Invalid email");
      }
  });
});

  // Check in admins table
//   connection.query(
//     `SELECT * FROM admins WHERE email = ? AND password = ?`,
//     [Email, Password],
//     (err, results) => {
//       if (err) {
//         return response.status(500).json({ error: "Database error" });
//       } else if (results.length > 0) {
//         // If user is an admin
//         const user = results[0];
//         return response.status(200).json({ message: 'Login successful', role: "admin", token });
//       } else {
//         // Check in students table
//         connection.query(
//           `SELECT * FROM students WHERE email = ? AND password = ?`,
//           [Email, Password],
//           (err, results) => {
//             if (err) {
//               return response.status(500).json({ error: "Database error" });
//             } else if (results.length > 0) {
//               // If user is a student
//               const user = results[0];
//               const token = jwt.sign({ id: user.id, role: "student" }, 'yourSecretKey', { expiresIn: '1h' });
//               return response.status(200).json({ message: 'Login successful', role: "student", token });
//             } else {
//               // Check in faculty table
//               connection.query(
//                 `SELECT * FROM faculty WHERE email = ? AND password = ?`,
//                 [Email, Password],
//                 (err, results) => {
//                   if (err) {
//                     return response.status(500).json({ error: "Database error" });
//                   } else if (results.length > 0) {
//                     // If user is a faculty member
//                     const user = results[0];
//                     const token = jwt.sign({ id: user.id, role: "faculty" }, 'yourSecretKey', { expiresIn: '1h' });
//                     return response.status(200).json({ message: 'Login successful', role: "faculty", token });
//                   } else {
                    // User not found in any table
                    // return response.status(401).json({ message: "Invalid credentials" });
//                   }
//                 }
//               );
//             }
//           }
//         );
//       }
//     }
//   );


// Middleware to authenticate token and check role
const verifyRole = (allowedRoles) => (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ message: 'Token is required' });

  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    if (!allowedRoles.includes(decoded.payload.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = decoded.payload;
    next();
  });
};

module.exports = verifyRole;


const router = express.Router();


// Route protection based on role
router.get('/home2', verifyRole(['admin']), (req, res) => {
  res.send("Welcome, Admin!");
});

router.get('/stuhome', verifyRole(['student']), (req, res) => {
  res.send("Welcome, Student!");
});

router.get('/fachome', verifyRole(['faculty']), (req, res) => {
  res.send("Welcome, Faculty!");
});

router.get('/hodhome', verifyRole(['hod']), (req, res) => {
  res.send("Welcome, Hod!");
});

module.exports = router;

// OTP Sending API
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
        connection.query('SELECT * FROM login WHERE email = ?', [email],(err,user)=>{
          if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        else if(err){
          return res.status(500).json({ message: "Internal Server Error" });
        }

        else{
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000; 
        const id=user[0].userid;
        const useremail=user[0].email 
        
        connection.query('INSERT INTO otp(userid, email, otp, expiresat) VALUES ("'+id+'","'+useremail+'","'+otp+'","'+expiresAt+'")',((err,row)=>{
          if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
          }
          else{
           
            const transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: 'learnease25@gmail.com',
                  pass: 'ipev fxlf dzfu drmv'
              }
          });
        const mailOptions = {
            from: 'learnease25@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending OTP email:', error);
                return res.status(500).json({ message: "Error sending email" });
            }
            res.status(200).json({ message: "OTP sent to your email", id:id,otp:otp });
        }); }
        }))


       
}})
});

// Password Reset API
app.post('/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;
  
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
  
    // First, verify if OTP exists in the otp table
    connection.query('SELECT * FROM otp WHERE email = ? and otp=?', [email,otp], (err, row) => {
  
      if (err) {
        
        return res.status(500).json({ message: "Internal Server Error" });
      } else if (row.length === 0) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      // Hash the new password before updating it
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      connection.query('select * from login where email=?',[email],(err,result)=>{
          if(!err){
           
            connection.query(`UPDATE ${result[0].role}  SET password = ? WHERE email = ?`, [hashedPassword, email], (err) => {
              if (err) {
                return res.status(500).json({ message: "Internal Server Error" });
              }
          
      })}})
      // Update the user's password in the users table
      connection.query('UPDATE login  SET password = ? WHERE email = ?', [hashedPassword, email], (err) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
  
        // Delete OTP record from the otp table after successful password reset
        connection.query('DELETE FROM otp WHERE email = ?', [email], (err) => {
          if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
          }
  
          return res.status(200).json({ message: "Password reset successfully" });
        });
      });
    });
  });

// Branch APIs
app.get("/branches",checkAuth, (req, res) => {
    const query = `SELECT * FROM branches`;
    connection.query(query, (err, results) => {
        if (!err) {
            res.status(200).json(results);
        } else {
            res.status(500).json({ error: `Error: ${err}` });
        }
    });
});

app.post("/addbranch",checkAuth, (req, res) => {
    const { branch } = req.body;
    const query = `INSERT INTO branches (name) VALUES (?)`;
    connection.query(query, [branch], (err) => {
        if (!err) {
            res.status(200).send('Branch added');
        } else {
            res.status(500).json({ error: `Error: ${err}` });
        }
    });
});

app.delete("/branch/:id",checkAuth, (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM branches WHERE id = ?`;
    connection.query(query, [id], (err) => {
        if (!err) {
            res.status(200).send({ message: 'Branch deleted' });
        } else {
            res.status(500).json({ error: `Error: ${err}` });
        }
    });
});



// Student APIs
app.get('/students',checkAuth, (req, res) => {
    const sql = `SELECT * FROM students`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Error fetching students" });
        res.json(results);
    });
});

app.post('/students',checkAuth, async(req, res) => {
    const {name,email,password,age,gender,branch,phone_number,
        course_duration,
        course_fee,
        total_fee}=req.body;

        
        const now = new Date();

        // Manually format the date and time
        const formattedDate = `${now.getFullYear()}/${
          (now.getMonth() + 1).toString().padStart(2, '0')
        }/${now.getDate().toString().padStart(2, '0')} ${
          now.getHours().toString().padStart(2, '0')
        }:${now.getMinutes().toString().padStart(2, '0')}:${now
          .getSeconds()
          .toString()
          .padStart(2, '0')}`;
        
        console.log("Current date and time: " + formattedDate);
        
       
        const hashpass=await bcrypt.hash(password,10);
        connection.query('select * from login where email=?',[email],(err,result)=>{
          if(result.length>0){
            return res.status(202).json({error:"Email already exists"})
            }
          else{
            let sql = `INSERT INTO students(name,email,password,age,gender,branch,phone_number,joindate,course_duration,course_fee,total_fee) values('${name}','${email}','${hashpass}',${age},'${gender}','${branch}',${phone_number},'${formattedDate}',${course_duration
            },${ course_fee
            },${ total_fee})`;
            connection.query(sql,(err, result) => {
                 if (err) {
                     console.error("Error adding student:", err);
                     return res.status(500).json({ error: "Error adding student" });
                 }
                 
            console.log("Student added in login  with ID:", result.insertId);
                connection.query(`insert into login(userid,email,password,role) values(${result.insertId},'${email}','${hashpass}','students')`,(err, result) => {
                  if (err) {
                      console.error("Error adding student into login :", err);
                      return res.status(500).json({ error: "Error adding student" });
                  } 
                  res.status(200).json({ message: 'Student added', id: result.insertId });
                  })
                
            });
          }
        })     
});


app.put('/students/:id',checkAuth, (req, res) => {
    const updatedData = req.body;
    
    const sql = `UPDATE students SET ? WHERE id = ?`;
    connection.query(sql, [updatedData, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: "Error updating student" });

        res.status(200).json({ message: 'Student updated' });
    });
});


app.delete('/students/:id',checkAuth, (req, res) => {
  // First, get the email associated with the student ID
  connection.query('SELECT email FROM students WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error retrieving student" });
    }

    // Check if a student with the given ID exists
    if (result.length > 0) {
      const email = result[0].email; // Store the email from the result

      // Delete from the login table
      connection.query('DELETE FROM login WHERE email = ?', [email], (err) => {
        if (err) {
          return res.status(500).json({ error: "Error deleting student from login" });
        }

        // Now, delete the student from the students table
        connection.query('DELETE FROM students WHERE id = ?', [req.params.id], (err) => {
          if (err) {
            return res.status(500).json({ error: "Error deleting student" });
          }

          // Respond with a 204 No Content status
          res.status(204).send(); // Send no content
        });
      });
    } else {
      // If no student found with the given ID
      res.status(404).json({ error: "Student not found" });
    }
  });
});

      

app.get('/students/:id',checkAuth, (req, res) => {
    const sql = `SELECT * FROM students WHERE id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error fetching student" });
        res.send(result[0]);
    });
});



// Faculty APIs
app.get('/faculty',checkAuth, (req, res) => {
    const sql = `SELECT * FROM faculty`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "Error fetching faculty" });
        res.send(results);
    });
});



app.post('/faculty', checkAuth, async (req, res) => {
  const { name, email, password, age, gender, branch, phone_number } = req.body;

  try {
      // Hashing the password
      const hashpass = await bcrypt.hash(password, 10);

      // Check if email already exists
      connection.query('SELECT * FROM login WHERE email = ?', [email], (err, result) => {
          if (err) {
              console.error("Error checking existing email:", err);
              return res.status(500).json({ error: "Internal server error" });
          }

          if (result.length > 0) {
              return res.status(409).json({ error: "Email already exists" });
          }

          // Insert faculty details into the faculty table
          const sql = `INSERT INTO faculty (name, email, password, age, gender, branch, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)`;
          connection.query(sql, [name, email, hashpass, age, gender, branch, phone_number], (err, result) => {
              if (err) {
                  console.error("Error adding faculty:", err);
                  return res.status(500).json({ error: "Error adding faculty" });
              }

              const facultyId = result.insertId;

              // Add login details for the faculty
              const loginSql = `INSERT INTO login (userid, email, password, role) VALUES (?, ?, ?, 'faculty')`;
              connection.query(loginSql, [facultyId, email, hashpass], (err) => {
                  if (err) {
                      console.error("Error adding faculty login details:", err);
                      return res.status(500).json({ error: "Error adding faculty" });
                  }

                  res.status(201).json({ message: "Faculty added successfully", id: facultyId });
              });
          });
      });
  } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});


app.delete('/faculty/:id',checkAuth, (req, res) => {
    const sql = `SELECT email FROM faculty WHERE id = ?`;
    connection.query(sql, [req.params.id],  [req.params.id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error retrieving student" });
      }
        
        if (result.length > 0) {
          const email = result[0].email; // Store the email from the result
    
          connection.query('DELETE FROM login WHERE email = ?', [email], (err) => {
            if (err) {
              return res.status(500).json({ error: "Error deleting staff from login" });
            }
    
            // Now, delete the student from the students table
            connection.query('DELETE FROM faculty WHERE id = ?', [req.params.id], (err) => {
              if (err) {
                return res.status(500).json({ error: "Error deleting staff" });
              }
    
              // Respond with a 204 No Content status
              res.status(204).send(); // Send no content
            });
          });
        } else {
          // If no student found with the given ID
          res.status(404).json({ error: "Staff not found" });
        }
      });
    });


app.put('/faculty/:id',checkAuth, (req, res) => {
    const updatedData = req.body;
    
    const sql = `UPDATE faculty SET ? WHERE id = ?`;
    connection.query(sql, [updatedData, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: "Error updating staff" });

        res.status(200).json({ message: 'Staff updated' });
    });
});

app.get('/faculty/:id',checkAuth, (req, res) => {
  const sql = `SELECT * FROM faculty WHERE id = ?`;
  connection.query(sql, [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error fetching staff" });
      res.send(result[0]);
  });
});


// Authentication middleware
app.get('/student/profile', checkAuth, (req, res) => {
  const studentId = req.user.userid; // Extracted from the token payload
  console.log(studentId)
  const sql = `SELECT name, email, age, branch, phone_number FROM students WHERE id = ?`;
  connection.query(sql, [studentId], (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching student profile" });
    
    res.json(result[0]); // Send the student's profile details
  });
});

app.get('/faculty/profile', checkAuth, (req, res) => {
  const facultyId = req.user.userid; // Extracted from the token payload
  console.log(facultyId)
  const sql = `SELECT name, email, age, phone_number, branch FROM faculty WHERE id = ?`;
  connection.query(sql, [facultyId], (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching staff profile" });
    
    res.json(result[0]);
  });
});


app.get('/hod/profile', checkAuth, (req, res) => {
  const studentId = req.user.userid; // Extracted from the token payload
  console.log(studentId)
  const sql = `SELECT name, email, branch, phone_number FROM hod WHERE id = ?`;
  connection.query(sql, [studentId], (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching student profile" });
    
    res.json(result[0]); // Send the student's profile details
  });
});

//hod

// Student APIs
app.get('/hod',checkAuth, (req, res) => {
  const sql = `SELECT * FROM hod`;
  connection.query(sql, (err, results) => {
      if (err) return res.status(500).json({ error: "Error fetching" });
      res.json(results);
  });
});

app.post('/hod',checkAuth, async(req, res) => {
  const {name,email,password,branch,phone_number}=req.body;

      
     
      const hashpass=await bcrypt.hash(password,10);
      connection.query('select * from login where email=?',[email],(err,result)=>{
        if(result.length>0){
          return res.status(202).json({error:"Email already exists"})
          }
        else{
          let sql = `INSERT INTO hod(name,email,password,branch,phone_number) values('${name}','${email}','${hashpass}','${branch}',${phone_number})`;
          connection.query(sql,(err, result) => {
               if (err) {
                   console.error("Error adding :", err);
                   return res.status(500).json({ error: "Error adding" });
               }
               
          console.log("hod added in login  with ID:", result.insertId);
              connection.query(`insert into login(userid,email,password,role) values(${result.insertId},'${email}','${hashpass}','hod')`,(err, result) => {
                if (err) {
                    console.error("Error adding hod into login :", err);
                    return res.status(500).json({ error: "Error adding " });
                } 
                res.status(200).json({ message: 'hod added', id: result.insertId });
                })
              
          });
        }
      })     
});


app.put('/hod/:id',checkAuth, (req, res) => {
  const updatedData = req.body;
  
  const sql = `UPDATE hod SET ? WHERE id = ?`;
  connection.query(sql, [updatedData, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: "Error updating" });

      res.status(200).json({ message: ' updated' });
  });
});


app.delete('/hod/:id',checkAuth, (req, res) => {
// First, get the email associated with the student ID
connection.query('SELECT email FROM hod WHERE id = ?', [req.params.id], (err, result) => {
  if (err) {
    return res.status(500).json({ error: "Error retrieving " });
  }

  // Check if a student with the given ID exists
  if (result.length > 0) {
    const email = result[0].email; // Store the email from the result

    // Delete from the login table
    connection.query('DELETE FROM login WHERE email = ?', [email], (err) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting hod from login" });
      }

      // Now, delete the student from the students table
      connection.query('DELETE FROM hod WHERE id = ?', [req.params.id], (err) => {
        if (err) {
          return res.status(500).json({ error: "Error deleting " });
        }

        // Respond with a 204 No Content status
        res.status(204).send(); // Send no content
      });
    });
  } else {
    // If no student found with the given ID
    res.status(404).json({ error: " not found" });
  }
});
});

    

app.get('/hod/:id',checkAuth, (req, res) => {
  const sql = `SELECT * FROM hod WHERE id = ?`;
  connection.query(sql, [req.params.id], (err, result) => {
      if (err) return res.status(500).json({ error: "Error fetching " });
      res.send(result[0]);
  });
});



// Create Quiz
app.post("/create-quiz", checkAuth, async (req, res) => {
  const { testName, questions } = req.body;

  if (!testName || !questions || questions.length === 0) {
      return res.status(400).send("Test name and questions are required.");
  }

  try {
      const [quizResult] = await db.query("INSERT INTO quizzes (test_name) VALUES (?)", [testName]);
      const quizId = quizResult.insertId;

      const questionPromises = questions.map((question) =>
          db.query(
              "INSERT INTO questions (quiz_id, question_text, options, correct_option) VALUES (?, ?, ?, ?)",
              [quizId, question.question, JSON.stringify(question.options), question.correctOption]
          )
      );

      await Promise.all(questionPromises);
      res.status(201).send("Quiz created successfully.");
  } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).send("Error creating quiz.");
  }
});


    
    


// Get All Quizzes
app.get("/quizzes",checkAuth, async(req, res) => {
  const query = "SELECT * FROM quizzes";
  connection.query(query, (err, results) => {
      if (err) {
          return res.status(500).send("Error fetching quizzes");
      }
      res.status(200).json(results);
  });
});

// Submit Quiz
app.post("/submit-quiz",checkAuth, async(req, res) => {
  const { studentId, quizId, score } = req.body;
  const query = "INSERT INTO quiz_results (student_id, quiz_id, score) VALUES (?, ?, ?)";
  connection.query(query, [studentId, quizId, score], (err, result) => {
      if (err) {
          return res.status(500).send("Error submitting quiz");
      }
      res.status(200).send("Quiz submitted successfully");
  });
});

app.get("/quiz-details/:quizId", checkAuth, async (req, res) => {
  const { quizId } = req.params;

  const query = `
      SELECT q.id AS question_id, q.question_text, q.options, q.correct_option
      FROM questions q
      WHERE q.quiz_id = ?
  `;

  connection.query(query, [quizId], (err, results) => {
      if (err) {
          return res.status(500).send("Error fetching quiz details");
      }
      res.status(200).json(results);
  });
});


// Get Quiz Results
app.get("/quiz-results/:quizId",checkAuth, async(req, res) => {
  const { quizId } = req.params;
  const query = `
      SELECT qr.*, s.name AS student_name 
      FROM quiz_results qr 
      JOIN students s ON qr.student_id = s.id 
      WHERE quiz_id = ?
  `;
  connection.query(query, [quizId],checkAuth, async(err, results) => {
      if (err) {
          return res.status(500).send("Error fetching results");
      }
      res.status(200).json(results);
  });
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});