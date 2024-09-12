import './style.css'
import { Client, Databases } from 'appwrite';

const client = new Client();
const database_ID='66e2c39a00318bd05fa7'
const collection_tasks_ID='66e2c3a9002985eeedf0'


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66e2c18500268169dccb');


const db=new Databases(client)

async function getTasks(){
  const response= await db.listDocuments(
    database_ID,
    collection_tasks_ID
  )

  console.log(response)
}

getTasks()