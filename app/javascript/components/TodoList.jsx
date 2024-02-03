import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Todo({ todo, index }) {
  return (
    <li key={index} className="d-flex justify-content-between list-group-item">
      <span className="d-flex justify-content-between gap-2">
        <input className="" type="checkbox" checked={ todo.done ? true : false } />
        <div style={{ textDecoration: todo.done ? "line-through" : "" }}>{todo.title}</div>
      </span>
      <span className="d-flex justify-content-between gap-2">
        <FontAwesomeIcon className="d-flex justify-content-end" icon={faPenToSquare} />
        <FontAwesomeIcon className="d-flex justify-content-end" icon={faTrash} />
      </span>
    </li>
  );
};

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const url = "/api/v1/todos";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => setTodos(data))
      .catch(() => navigate("/"));
  }, []);

  return (
    <>
      <div className="primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="text-center display-5">Todo List</h1>
            <hr className="my-4" />

            <div className="mt-4">
              <ul className="list-group">
                {todos.map((todo, index) => (
                  <Todo todo={todo} key={index} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
