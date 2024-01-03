import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios';
import './App.css'
import { BsCircleFill, BsFillTrashFill,BsFillCheckCircleFill } from 'react-icons/bs';
 

function Home() {
    const handleedit=(id)=>{
        axios.put('https://todo-list-q7he.onrender.com/update/'+id)
        .then(result => console.log(result) )
        window.location.reload();
    }
    const handledelete=(id)=>{
        axios.delete('https://todo-list-q7he.onrender.com/delete/'+id)
        .then(result => console.log(result) )
        window.location.reload();
    }
    const[todos,settodos]=useState([]);
    useEffect(()=>{
        axios.get('https://todo-list-q7he.onrender.com/get')
        .then(result => settodos(result.data))
    },[])
    console.log(todos)
    const arr=[1,2,3,4,5]
  return (
    <div className='home'>
      <p className='hd'>Todo List</p>
      <Create/>
      {
        todos.length===0 ?
        <div> <p className='notfound'>No Record!!</p></div>
        :
        
       todos.map((todo) => (
        <div className='task' >
           <div className='checkbox' onClick={()=>handleedit(todo._id)}>
            {todo.done ? <BsFillCheckCircleFill className='icon'/> :  <BsCircleFill className='icon'/>}
            {todo.done ?  <s className='todo'> {todo.task.charAt(0).toUpperCase() + todo.task.slice(1)}</s> :   <p className='todo'> {todo.task.charAt(0).toUpperCase() + todo.task.slice(1)}</p>}
           </div>
           <div>
            <span onClick={()=>handledelete(todo._id)}> <BsFillTrashFill className='icon'/> </span>
           </div>
            </div>
        
      ))
      }
    </div>
  )
}

export default Home
