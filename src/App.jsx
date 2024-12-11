import { useState,useEffect } from 'react'
import './App.css'
import {TodoContextProvider} from './Context'
import {TodoForm,TodoItem} from './Components';
function App() {
  const [todoList,setTodoList]=useState([]);
  const addTodo=(title)=>{
    setTodoList((prevTodoList)=>[{ id:Date.now(),title},...prevTodoList])
   
    
    //todoList is an array of objects so we can use spread operator to add objects in new array
  }
  const updateTodo=(id,title)=>{
    setTodoList((prevTodoList)=> prevTodoList.map((prevTodo)=> prevTodo.id===id?({...prevTodo,title}):prevTodo))
  }
  const deleteTodo=(id)=>{
    setTodoList((prevTodoList)=>prevTodoList.filter((prevTodo)=>id!==prevTodo.id));
  }
  const completeToggle=(id)=>{
    setTodoList((prevTodoList)=> prevTodoList.map((prevTodo)=>( prevTodo.id===id? {...prevTodo,isDone:!prevTodo.isDone} : prevTodo)))
  }
  useEffect(()=>{
    const todoList=JSON.parse(localStorage.getItem('todoList'));
    if(todoList && todoList.length>0){
      setTodoList(todoList);//toDoList is an array of objects
    }

  },[])
  useEffect(()=>{
    localStorage.setItem('todoList',JSON.stringify(todoList));
  },[todoList])
  return (
    <TodoContextProvider value={{todoList,addTodo,deleteTodo,updateTodo,completeToggle}}>
    <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
            <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
           {todoList.map((todo)=>(
            <div key={todo.id}
             className="w-full">
                <TodoItem todo={todo} /> //object passed as props
            </div>
           ))}
        </div>
    </div>
</div>
</TodoContextProvider>
  )
}

export default App
