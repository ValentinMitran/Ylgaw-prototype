import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import useTodoState from "./useTodoState";
import "./ToDo.scss";

const ToDo = (props) => {
  const { todos, addTodo, deleteTodo } = useTodoState([]);

  return (
    <div className={props.isSidebarOpen ? "main" : "mainSideClosed"}>
      <div className="todo">
        <TodoForm
          saveTodo={(todoText) => {
            const trimmedText = todoText.trim();

            if (trimmedText.length > 0) {
              addTodo(trimmedText);
            }
          }}
        />

        <TodoList todos={todos} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
};
export default ToDo;
