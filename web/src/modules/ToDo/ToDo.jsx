import React, { useState, useEffect } from "react";
import "./ToDo.scss";
import { MdDelete } from "react-icons/md";

function ToDo(props) {
  const [todos, setTodos] = useState([
    { text: "Be a well known developer" },
    { text: "Get a Job" },
    { text: "Advertise Ylgaw" }
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async e => {
    e.preventDefault();
    if (!newTodo) {
      return;
    }
    setTodos(todos => todos.concat({ text: newTodo }));
    setNewTodo("");
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className={props.isSidebarOpen ? "main" : "mainSideClosed"}>
    <div className="todoList">
        {todos.map((todo, index) => (
          <div className="todo" key={index} index={index}>
            {todo.text}
            <MdDelete onClick={() => removeTodo(index)} />
          </div>
        ))}
        <form onSubmit={addTodo}>
          <input
            type="text"
            name="newTodo"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default ToDo;