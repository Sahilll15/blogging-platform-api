const express = require('express');
const mysql = require('mysql2');
const fs = require('fs');
const cors=require('cors')
const {connection}=require('./db')
const authRoutes=require('./routes/auth.routes')
const blogRoutes=require('./routes/blog.routes')
const commentRoutes=require('./routes/commnets.routes')

const app = express();
const port = 4000; 



app.use(express.json());
app.use(cors())



app.use('/auth',authRoutes)
app.use('/blog',blogRoutes)
app.use('/comment',commentRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }
);





