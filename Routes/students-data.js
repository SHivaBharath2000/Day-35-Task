import express from 'express';

import { db } from '../Database/mongo-connection.js';
const studentData=express.Router();

//Insert the student records in the DB
studentData.post("/",async(req,res)=>{
    const {body}=req;
    const collection=db.collection('studentsDB');
    try{
    await collection.insertOne({
        ...body,
        studentId:Date.now().toString(),
       
    })
    res.send({msg:"Insert student success"})
}catch (error) {
    console.error("Error inserting documents:", error);
    res.status(500).send({ msg: "Insert student failed" });
  }
})
//Student who has no mentor
studentData.get("/",async(req,res)=>{
    const collection=db.collection('studentsDB');
   const data= await collection.find({
        mentorId:"null"}).toArray()
        res.send(data)
})

//Assign one student to mentor
studentData.put("/:studentId",async(req,res)=>{
    const{body}=req
    const{studentId}=req.params
    try{
        const collection=db.collection('studentsDB');
        await collection.updateOne({studentId:studentId},{$set:{...body}})
        res.send({msg:"updated successfully"})
    }catch (error) {
        console.error("Error getting documents:", error);
        res.status(500).send({ msg: "Check the student ID" });
      }
})

//Show all students in particular mentor
studentData.get("/:mentorname",async(req,res)=>{
    const{mentorname}=req.params
    const collection=db.collection('studentsDB');
   const data= await collection.find({
        mentorName:mentorname}).toArray()
        res.send([data])
})
//show previous mentor for each student
studentData.get("/previousmentor",async(req,res)=>{
   
    const collection=db.collection('studentsDB');
   const data= await collection.find({
    previousMentorId}).toArray()
        res.send(data)
})



export default studentData