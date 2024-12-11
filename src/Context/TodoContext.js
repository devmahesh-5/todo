import React,{createContext,useContext} from "react";
export const TodoContext=createContext({
    todoList:[{
        id:1,
        title:"todo1",
        isDone:false
    }],
    addTodo:(title)=>{},
    deleteTodo:(id)=>{},
    updateTodo:(id,title)=>{},
    completeToggle:(id)=>{}
});
export const TodoContextProvider=TodoContext.Provider;
export function useTodo(){
    return useContext(TodoContext);
}