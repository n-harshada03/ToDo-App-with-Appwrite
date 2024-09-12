import './style.css'
import { Client, Databases, ID } from 'appwrite';

const client = new Client();

const database_ID='66e2c39a00318bd05fa7'
const collection_tasks_ID='66e2c3a9002985eeedf0'


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66e2c18500268169dccb');


const db=new Databases(client)

const tasksList= document.getElementById('tasks-list')
const form=document.getElementById('form')

form.addEventListener('submit',addTask)
getTasks()

async function getTasks(){
  const response= await db.listDocuments(
    database_ID,
    collection_tasks_ID
  )

  // console.log(response)
  const tasks=response.documents

  for(let i=0;i< tasks.length;i++){
    renderToDom(tasks[i])
  }
}


const renderToDom=async (task) =>{
// add item to DOM
  const taskWrapper= `<div class="task-wrapper" id="task-${task.$id}"> 
                          <p class="complete-${task.completed}">${task.body}</p>
                          <strong class="delete" id="delete-${task.$id}">X</strong> 
                      </div>`

  tasksList.insertAdjacentHTML('afterbegin',taskWrapper)

  const deleteButton=document.getElementById(`delete-${task.$id}`)
  const wrapper=document.getElementById(`task-${task.$id}`)
  
  //delete task event handler
  deleteButton.addEventListener('click',() =>{
    db.deleteDocument(
      database_ID,
      collection_tasks_ID,
      task.$id
      )

    document.getElementById('task-${task.$id}').remove()
})

//update task event handler
wrapper.querySelector('p').addEventListener('click',async(e) =>{
  task.completed=! task.completed
  e.target.className='complete-${task.completed}'

  await db.updateDocument(
    database_ID,
    collection_tasks_ID,
    task.$id,
    {'completed':task.completed}
  )
})

}


async function addTask(e ){
  e.preventDefault()

  const taskBody=e.target.body.value

  if(taskBody==''){
    alert("Field cannot be empty!")
    return
  }

  const response=await db.createDocument(
    database_ID,
    collection_tasks_ID,
    ID.unique(),
    {'body':taskBody}
  )
  
  renderToDom(response)
  form.reset()


}