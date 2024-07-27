import { MongoClient } from "mongodb";

const dbCluster='127.0.0.1:27017';
const dbName="class-db";
const localUri=`mongodb://${dbCluster}/${dbName}`
const client= new MongoClient(localUri)
const db=client.db(dbName);

const connectToDb=async()=>{
    try{
        await client.connect();
        console.log("DB CONNECTED SUCCESSFULLY")
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
export {client,db};
export default connectToDb;
