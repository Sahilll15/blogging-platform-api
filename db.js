const mysql = require('mysql2');
const fs = require('fs');

require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
    ca: fs.readFileSync(process.env.DB_SSL_CA).toString(),
  },
});

  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });


    module.exports={
        connection
    }