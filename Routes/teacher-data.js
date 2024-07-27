import express from 'express';

import { db } from '../Database/mongo-connection.js';
const teacherData=express.Router();

//Get all the teachers data
teacherData.get("/",async(req,res)=>{
    const collection=db.collection('teachersDB')
    const data= await collection.find({}).toArray()
    res.send(data)
})

//Insert the teacher records in the DB
teacherData.post("/",async(req,res)=>{
    const {body}=req;
    const collection=db.collection('teachersDB');
    try{
    await collection.insertOne({
        ...body,
        TeacherId:Date.now().toString()
    })
    res.send({msg:"Insert teacher success"})
}catch (error) {
    console.error("Error inserting documents:", error);
    res.status(500).send({ msg: "Insert teacher failed" });
  }
})

//select one mentor to add multiple students
teacherData.put("/:teacherId",async(req,res)=>{
    const {body}=req;
    const {teacherId}=req.params;
    const collection=db.collection('teachersDB');
    try{
    await collection.updateMany({
        TeacherId:teacherId
    },{$set:{...body}},{upsert:true})
    res.send({msg:"Students added  successfully"})
}catch (error) {
    console.error("Error inserting documents:", error);
    res.status(500).send({ msg: "Insert students failed" });
  }
})

export default teacherData