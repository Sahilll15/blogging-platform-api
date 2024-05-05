const {connection}=require('../db')
const { v4: uuidv4 } = require('uuid');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



const register=async (req, res) => {
    
    const { username, email, password } = req.body;
 
    try {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
              console.error('Error hashing password: ', err);
              return res.status(500).send('Error registering user');
            }
            
            const newUser = {
               
              username: username,
              email: email,
              password: hashedPassword
            };
        
            connection.query('INSERT INTO Users SET ?', newUser, (err, result) => {
              if (err) {
                console.error('Error inserting user: ', err);
                return res.status(500).send('Error registering user');
              }
              res.status(201).json({
                message: 'User registered successfully',
                user: {
                  id: result.insertId,
                  ...newUser
                }
              })
            });
          });
    } catch (error) {
        console.error('Error registering user: ', error);
        res.status(500).send('Error registering user');  
    }
  };


  const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        connection.query('SELECT * FROM Users WHERE email = ?', email, (err, results) => {
            if (err) {
                console.error('Error selecting user: ', err);
                return res.status(500).send('Error selecting user');
            }
            if (results.length === 0) {
                return res.status(404).send('User not found');
            }
            const user = results[0];
            
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error('Error comparing passwords: ', err);
                    return res.status(500).send('Error logging in');
                }
                if (!result) {
                    return res.status(401).send('Invalid email or password');
                }
                
                const token = jwt.sign({ userId: user.id, email: user.email }, 'jwt_secret', { expiresIn: '1h' });
                res.status(200).json({ 
                    message: 'User logged in successfully',
                    token: token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                 });
            });
        });
    } catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).send('Error logging in');
    }
};

const getloggedinuser=async(req,res)=>{
        const user=req.user;
    try {
        console.log('user',user)
        connection.query('SELECT * FROM Users WHERE id = ?', user.userId, (err, results) => {
            if (err) {
                console.error('Error selecting user: ', err);
                return res.status(500).send('Error selecting user');
            }
            if (results.length === 0) {
                return res.status(404).send('User not found');
            }
            const user = results[0];
            res.status(200).json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        });

    } catch (error) {
        res.status(400).json({
            message:'Error getting logged in user',
            error
        
        })
    }
}



  module.exports={
        register,
        login,
        getloggedinuser
  }