import './style.css'
import { Client, Databases } from 'appwrite';

const client = new Client();
const database_ID='66e2c39a00318bd05fa7'
const collection_tasks_ID='66e2c3a9002985eeedf0'


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66e2c18500268169dccb');


const db=new Databases(client)

const taskList= document.getElementById('tasks-list')

async function getTasks(){
  const response= await db.listDocuments(
    database_ID,
    collection_tasks_ID
  )

  console.log(response)

  for(let i=0;i< response.documents.length;i++){
    renderToDom(response.documents[i])
  }
}

getTasks()

function renderToDom(task){

  const taskWrapper= `<div class="task-wrapper" id="task-${task.$id}}"> 
                          <p class="complete-${task.completed}">${task.body}</p>
                          <strong class="delete" id="delete-${task.$id}">X</strong> 
                      </div>`

  taskList.insertAdjacentHTML('afterbegin',taskWrapper)
}