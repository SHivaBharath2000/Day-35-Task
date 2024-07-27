import express from 'express';
import teacherData from './Routes/teacher-data.js';
import studentData from './Routes/students-data.js';

const server=express()
server.use(express.json())


server.use('/teachers',teacherData);
server.use('/students',studentData);

const port=5000
server.listen(port,()=>{
    console.log("server listening on port"+port);

})